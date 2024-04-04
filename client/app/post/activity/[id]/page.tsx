"use client";
import "@/styles/global.css";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import RatingStars from "@/components/RatingStars";
import Link from "next/link";
import StarReview from "@/components/StarReview";
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Heading1, SpadeIcon } from "lucide-react";

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
  description? : string,
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
    <div className="flex min-h-screen">
      <div className="w-2/3 flex flex-col px-20 my-14 border-r border-black">
      <div className="intro border-b border-black pb-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">TutorHub</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/browse">Browse</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="capitalize">{post.activityTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-sans font-extrabold uppercase text-5xl leading-none mt-0 mb-1 text-slate-800 pt-2">{post.activityTitle}</h1>
          <h3 className="w-full text-xs tracking-wide leading-tight capitalize font-medium mb-3 text-slate-700">${post.price} / hour</h3>
          <div className="flex items-center justify-between space-x-2">
          <img
            src="/defaultimg.jpeg"
            alt={`${user.firstName}'s Avatar`}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-grow flex flex-col justify-center">
            <span className="text-sm font-semibold">by {user.firstName} {user.lastName} - Tutor Hub</span>
            <span className="text-xs text-gray-500">published Mar 30, 2024</span>
          </div>
          <div className="flex flex-col items-end">
            <RatingStars rating={4.8} starSize={20} />
            <span className="text-sm">
              4.8 from 30 reviews
            </span>
          </div>
        </div>
      </div>
      <p className="py-8">{post.activityDescription}</p>
      </div>
      <div className="w-1/3 flex flex-col items-center pr-20 my-10">
      <div className="content px-20">
          <div className="w-[300px] info-box max-w p-4 border-2 border-black mt-10 mb-6" style={{
              boxShadow: '5px 5px 0px rgba(0, 0, 0, 10)',
            }}>
            <h1 className="bg-blue-300 text-black text-lg font-extrabold uppercase p-1 mb-2 inline-block font-sans">
              About {user.firstName} {user.lastName}
            </h1>
            <p className="text-black mb-4 line-clamp-4 overflow-ellipsis">
              {user.description}
            </p>
            <Link href={`/profile/` + post.userId}  className="bg-black text-white uppercase text-sm px-4 py-2 mt-4">
              Learn More
            </Link>
          </div>
          <div className="review-content">
            <h1 className="font-sans font-extrabold uppercase text-3xl leading-none mt-0 mb-1 text-slate-800 pt-2 self-start">
              leave a review
            </h1>
            <p>Required fields are marked *</p>
            <h2 className="font-sans font-extrabold uppercase text-l leading-none mt-2 mb-0 text-slate-700 pt-2 self-start">tutor rating *</h2>
            <div className="flex py-1 ">
              <StarReview />
            </div>
            <h2 className="font-sans font-extrabold uppercase text-l leading-none mt-2 mb-0 text-slate-700 pt-2 self-start">Comment *</h2>
            <Textarea className="resize-none my-2 rounded"/>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                make my response anonymous
              </label>
            </div>
            <button className="uppercase info-box max-w p-4 border-2 border-black mt-4 mb-6 font-md font-bold bg-blue-300" style={{
              boxShadow: '2px 2px 0px rgba(0, 0, 0, 10)',
            }}>
              post comment
            </button>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="h-[40vh]">
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
    </div> */}
  </>;
}

export default Page;