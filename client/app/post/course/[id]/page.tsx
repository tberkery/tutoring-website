"use client";
import "@/styles/global.css";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { FC, useEffect, useState } from "react";

type coursePostType = {
  _id? : string,
  userId? : string,
  courseName? : string,
  description? : string,
  price? : number,
  courseNumber? : string,
  courseDepartment? : string[],
  gradeReceived? : string,
  semesterTaken? : string,
  professorTakenWith? : string,
  takenAtHopkins? : boolean,
  schoolTakenAt? : string,
}

type userType = {
  firstName? : string,
  lastName? : string,
}

const Page : FC = ({ params }: { params : { id: string, type: string }}) => {
	const api : string = process.env.NEXT_PUBLIC_BACKEND_URL;
  const postId = params.id;

  const [post, setPost] = useState<coursePostType>({});
  const [user, setUser] = useState<userType>({});
  const [imgUrl, setImgUrl] = useState("/jhulogo.jpeg");
  const [loadedPost, setLoadedPost] = useState(false);

  const loadOldPost = async () => {
    const response = await axios.get(`${api}/coursePosts/findOne/${postId}`);
    setPost(response.data.post);
    const imgKey = response.data.post.coursePostPicKey;
    const profile = await axios.get(`${api}/profiles/${response.data.post.userId}`)
    setUser(profile.data.data);
    if (imgKey) {
      try {
        const url = await axios.get(`${api}/coursePostPics/get/${imgKey}`);
        setImgUrl(url.data.coursePostPicKey);
      } catch (e) {
        console.error(e);
      }
    }
    setLoadedPost(true);
  }

  useEffect(() => { loadOldPost() }, []);

  const formatGrade = (s : string) => {
    if (s.charAt(0).toUpperCase() === 'A') {
      return `an ${s}`;
    } else {
      return `a ${s}`;
    }
  };

  const showTop = () => {
    return post.semesterTaken || post.professorTakenWith
    || post.schoolTakenAt || post.gradeReceived;
  }

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
      <div className="bg-white px-8 py-6 border relative -top-14">
        <h1 className="text-4xl">
          <span className="font-bold">{post.courseName}, </span>
          with
          <span className="font-bold"> {user.firstName} {user.lastName}</span>
        </h1>
      </div>
    </div>
    <div className="flex justify-center mt-16">
      <div className="bg-white px-8 py-4 rounded-2xl w-3/5">
        { showTop() ? 
          <p className="text-center text-lg">
            Course taken
            { post.semesterTaken ? 
              <span className="font-bold">
                {` ${post.semesterTaken}, `}
              </span>
            :
              ' '
            }
            { post.professorTakenWith ? 
              <>
              with
                <span className="font-bold">
                  {` ${post.professorTakenWith}, `}
                </span>
              </>
            :
              post.schoolTakenAt ? `at ${post.schoolTakenAt} ` : ' '
            }
            { post.gradeReceived ? 
              <>
                for a
                <span className="font-bold">
                  {` ${formatGrade(post.gradeReceived)}`}
                </span>
              </>
            :
              ' '
            }
          </p>
        :
            <></>
        }
        { post.price ? 
          <p className="text-center">
            Offered starting at ${post.price} per hour
          </p>
        :
          <></>
        }
        {
          post.description ?
          <p className="mt-2">{post.description}</p>
        :
          <></>
        }
      </div>
    </div>
  </>;
}

export default Page;