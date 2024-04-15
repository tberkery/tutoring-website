"use client";
import React, { FC, useEffect, useState } from "react";
import axios from 'axios';
import Link from 'next/link'; 
import { useRouter } from "next/navigation";
import "../../styles/global.css";
import { useUser } from '@clerk/clerk-react';
import PostCard from '../../components/PostCard';
import Navbar from "../../components/Navbar"
import Loader from '../../components/Loader';
import RatingStars from "@/components/RatingStars";
import ReviewCard from "@/components/ReviewCard";
import ProfileAnalytics from "@/components/ProfileAnalytics";
import Availability from "@/components/Availability";

interface Post {
  _id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  activityTitle?: string;
  activityDescription?: string;
  courseName?: string;
  description?: string;
  imageUrl?: string;
  price: number;
  courseNumber?: string;
  courseDepartment?: string[];
  gradeReceived?: string;
  semesterTaken?: string;
  professorTakenWith?: string;
  takenAtHopkins?: boolean;
  schoolTakenAt?: string;
  tags?: string[];
  reviews: Review[],
  __v: number;
}

type Review = {
  postId: string,
  postName?: string,
  postType?: string,
  posterId: string,
  reviewerId: string,
  title?: string,
  reviewDescription: string,
  rating: number,
}

const Page : FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [posts, setPosts] = useState<Post[]>([]);
  const [bestPosts, setBestPosts] = useState<Post[]>([]);
  const [reviewAvg, setReviewAvg] = useState(5);
  const [profileData, setProfileData] = useState(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState("../defaultimg.jpeg");
  const [activeSection, setActiveSection] = useState("Posts");

  const router = useRouter();

  const fetchData = async () => {
    if (!isLoaded || !isSignedIn) {
      return false;
    }
    try {
      const userInfo = await axios.get(`${api}/profiles/getByEmail/${user.primaryEmailAddress.toString()}`);
      if (userInfo.data.data.length === 0) {
        router.replace('/createAccount');
      }
      setProfileData(userInfo.data.data[0]);
      const posts = await axios.get(`${api}/allPosts/findAllByUserId/${userInfo.data.data[0]._id}`);
      if (posts.data.length !== 0) {
        setPosts(posts.data);
        let reviews : Review[] = [];
        posts.data.forEach((post : Post) => {
          post.reviews.forEach((review) => {
            // @ts-ignore
            review.postName = post.courseName ? post.courseName : post.activityTitle;
            review.postType = 'courseName' in post ? 'course' : 'activity';
            reviews.push(review);
          })
        })
        setReviews(reviews);
        let sorted : Post[] = posts.data.sort((a : Post, b : Post) => {
          let aValue = 0;
          if (a.reviews.length > 0) {
            a.reviews.forEach((review) => aValue += review.rating);
            aValue /= a.reviews.length;
          }
          let bValue = 0
          if (b.reviews.length > 0) {
            b.reviews.forEach((review) => bValue += review.rating);
            bValue /= b.reviews.length;
          }
          return bValue - aValue;
        })
        let best = sorted.slice(0, Math.min(3, sorted.length));
        best = best.filter((post) => post.reviews.length > 0);
        setBestPosts(best);
      }
      if (userInfo.data.data[0].profilePicKey) {
        const picUrl = await axios.get(`${api}/profilePics/get/${userInfo.data.data[0].profilePicKey}`);
        setImgUrl(picUrl.data.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching posts', error);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchData();
  }, [api, user, isLoaded, isSignedIn]);

  useEffect(() => {
    let ratingTotal = 0;
    reviews.forEach((review) => ratingTotal += review.rating);
    console.log(ratingTotal);
    setReviewAvg(ratingTotal / reviews.length);
  }, [reviews])

  if (loading || !profileData) {
    return (
      <>
        <Loader />
      </>
    )
  }

  const getTabSection = () => {
    if (activeSection === "Posts") {
      return (
        <div 
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2
          lg:grid-cols-3 gap-4"
        >
          { posts.map((post) => (
            <PostCard key={post._id} post={post} />
          )) }
        </div>
      )
    } else if (activeSection === "Reviews") {
      return (
        <div className="flex flex-col justify-center max-w-3xl w-full">
          { reviews.map((review, index) => (
            <ReviewCard 
              key={`review-${index}`}
              review={review}
              className="mb-4 bg-white rounded-lg shadow-md"
            />
          )) }
        </div>
      )
    } else if (activeSection === "Analytics") {
      if (!profileData || !profileData._id) {
        return <></>
      } 
      return <ProfileAnalytics profileId={profileData._id} bestPosts={bestPosts}/>
    } else if (activeSection === "Availability") {
        return (
          <div className="flex flex-col justify-center max-w-3xl w-full">
              <Availability />
          </div>
        )
    }
    else {
      return <></>
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-evenly items-center bg-blue-300 py-16 px-16">
        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl font-extrabold font-sans uppercase text-black">
            {profileData.firstName} {profileData.lastName} - {profileData.department}
            {profileData.graduationYear ? `, ${profileData.graduationYear}` : ''}
          </h1>
          <p className="text-s underline font-light mb-2">{profileData.email}</p>
          <p className="text-gray-700 text-base">{profileData.description}</p>
        </div>
        <div className="flex-none flex flex-col items-center">
          <img className="w-48 h-48 snap-center rounded-md" src={imgUrl} alt={`${profileData.firstName}`} />
          { reviews.length > 0 ?
            <RatingStars rating={reviewAvg} starSize={26} numReviews={reviews.length} className="mt-2"/>
          :
            <></>
          }
          <div className="flex mt-2 space-x-4">
            <Link href="/profile/edit" passHref>
              <button className="bg-custom-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">
                Edit Profile
              </button>
            </Link>
            <Link href="/createPost" passHref>
              <button className="bg-custom-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">
                Create Post
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full bg-blue-300 relative">
        <div className="ml-8 flex items-end">
          { ["Posts", "Reviews", "Analytics", "Availability"].map((value, index) => {
            return (
              <button 
                key={`tab-${index}`}
                className={`text-md w-32 mx-1 py-2 rounded-t-lg font-bold 
                transition border-black relative -bottom-2 pb-4
                ${activeSection === value ? 
                  "bg-pageBg border-t border-l border-r z-20" :
                  "hover:-translate-y-2 bg-sky-100"}
                `}
                disabled={activeSection === value}
                onClick={ () => setActiveSection(value) }
              >
                { value }
              </button>
            )
          }) }
        </div>
        <div className="w-full bg-pageBg absolute h-4 top-[50px] z-30"/>
        <div
          className="relative z-10 border-t border-black bg-pageBg px-6 py-8
          flex justify-center"
        >
          { getTabSection() }
        </div>
      </div>
    </>
  );
};

export default Page;
