"use client";
import "@/styles/global.css";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { FC, useEffect, useState } from "react";

type activityPostType = {
  _id? : string,
  userId? : string,
  activityTitle? : string,
  activityDescription? : string,
  price? : number,
  tags? : string[],
}

type userType = {
  firstName? : string,
  lastName? : string,
}

const Page : FC = ({ params }: { params : { id: string, type: string }}) => {
	const api : string = process.env.NEXT_PUBLIC_BACKEND_URL;
  const postId = params.id;

  const [post, setPost] = useState<activityPostType>({});
  const [user, setUser] = useState<userType>({});
  const [imgUrl, setImgUrl] = useState("/jhulogo.jpeg");
  const [loadedPost, setLoadedPost] = useState(false);

  const loadOldPost = async () => {
    const response = await axios.get(`${api}/activityPosts/findOne/${postId}`);
    setPost(response.data.post);
    const imgKey = response.data.post.activityPostPicKey;
    for (const key in response.data.post) {
      console.log(key + ': ' + response.data.post[key]);
    }
    const profile = await axios.get(`${api}/profiles/${response.data.post.userId}`)
    setUser(profile.data.data);
    // if (imgKey) {
    //   const url = await axios.get(`${api}/activityPostPics/get/${imgKey}`);
    //   setImgUrl(url.data.activityPostPicKey);
    // }
    setLoadedPost(true);
  }

  useEffect(() => { loadOldPost() }, []);

  if (!loadedPost) {
    return <></>;
  }

  return <>
    <Navbar/>
    <div className="h-[40vh]">
      <img 
        src={imgUrl}
        className="object-cover w-full h-full"
      />
    </div>
    <div className="flex justify-center absolute w-full">
      <div className="bg-white px-8 pt-6 pb-4 border relative -top-14">
        <h1 className="text-4xl">
          <span className="font-bold">{post.activityTitle}, </span>
          with
          <span className="font-bold"> {user.firstName} {user.lastName}</span>
        </h1>
        <div className="mt-4 flex justify-center gap-x-2">
          { post.tags.map((tag : string) => {
            return (
              <div 
                className="px-3 py-1 flex items-center
                bg-pageBg rounded-xl"
                key={tag}
              >
                {tag}
              </div>
            )
          })}
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-24">
      <div className="bg-white px-8 py-4 rounded-2xl w-3/5">
        { post.price ? 
          <p className="text-center">
            Offered starting at ${post.price} per hour
          </p>
        :
          <></>
        }
        <p className="mt-4">{post.activityDescription}</p>
      </div>
    </div>
  </>;
}

export default Page;