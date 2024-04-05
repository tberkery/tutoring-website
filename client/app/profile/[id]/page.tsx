"use client";
import React, { FC, useEffect, useState } from "react";
import "@/styles/global.css";
import axios from "axios";
import Navbar from "@/components/Navbar"
import Link from 'next/link';
import Loader from "@/components/Loader";
import PostCard from "@/components/PostCard";
import RatingStars from "@/components/RatingStars";
import ReviewCard from "@/components/ReviewCard";
import { useUser } from '@clerk/clerk-react';
import { result } from "cypress/types/lodash";

interface Profile {
  affiliation: string;
  department: string;
  description: string;
  email: string;
  firstName: string;
  graduationYear: string;
  lastName: string;
  posts: string[];
  availability: number[];
}

interface ActivityPost {
  _id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  activityTitle: string;
  activityDescription: string;
  imageUrl: string;
  price: number;
  tags: string[];
  __v: number;
}

interface CoursePost {
  _id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  courseName: string;
  description: string;
  price: number;
  courseNumber: string;
  courseDepartment: string[];
  gradeReceived: string;
  semesterTaken: string;
  professorTakenWith: string;
  takenAtHopkins: boolean;
  schoolTakenAt: string;
  __v: number;
}

type Post = ActivityPost | CoursePost;

const Page : FC = ({ params }: { params : { id: string }}) => {
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  const [profileData, setProfile] = useState<Profile>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [imgUrl, setImgUrl] = useState("../defaultimg.jpeg");
  const [activeSection, setActiveSection] = useState("Posts");
  const { isLoaded, isSignedIn, user } = useUser();

  const availabilityToInterval = (availability: number[]) => {
    const sortedArray = availability.sort((a, b) => a - b);
    let start = sortedArray[0];
    let end = sortedArray[0];
    const intervals = [];

    for (let i = 1; i < sortedArray.length; i++) {
        if (sortedArray[i] === end + 1) {
            end = sortedArray[i];
        } else {
            intervals.push([start, end]);
            start = sortedArray[i];
            end = sortedArray[i];
        }
    }
    intervals.push([start, end]);
    return intervals;
  }

  function formatStartTime(t) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const dayIndex = Math.floor((t- 1) / 96);
    const timeIndex = ((t - 1) % 96) * 15; 

    const startHours = Math.floor(timeIndex / 60).toString().padStart(2, '0');
    const startMinutes = (timeIndex % 60).toString().padStart(2, '0');

    const endHours = Math.floor((timeIndex + 15) / 60).toString().padStart(2, '0');
    const endMinutes = ((timeIndex + 15) % 60).toString().padStart(2, '0');

    const formattedString = `${days[dayIndex]} ${startHours}:${startMinutes}`;

    return formattedString;
}

function formatEndTime(t) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const dayIndex = Math.floor((t- 1) / 96);
    const timeIndex = ((t - 1) % 96) * 15; 

    const startHours = Math.floor(timeIndex / 60).toString().padStart(2, '0');
    const startMinutes = (timeIndex % 60).toString().padStart(2, '0');

    const endHours = Math.floor((timeIndex + 15) / 60).toString().padStart(2, '0');
    const endMinutes = ((timeIndex + 15) % 60).toString().padStart(2, '0');

    const formattedString = `${endHours}:${endMinutes}`;

    return formattedString;
}
  const compareAvail = async () => {
    const userInfo = await axios.get(`${api}/profiles/getByEmail/${user.primaryEmailAddress.toString()}`);
    const bothAvailable = profileData.availability.filter(value => userInfo.data.data[0].availability.includes(value));

    //overlapping intervals!!
    const intervals = availabilityToInterval(bothAvailable);

    let result = "";
    intervals.forEach((interval) => {
      const from = formatStartTime(interval[0]);
      const to = formatEndTime(interval[1]);
      result +=  from + " - " + to + '\n';
    })
    window.alert('Ovelapping times:' + result);

  }

  const reviews = [
    {
      'title' : 'Very Good!!',
      'rating' : 5,
      'leftBy' : 'Kat Forbes',
      'post' : 'Piano Lessons',
      'text' : "Review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text",
    },
    {
      'title' : 'Bad Experience...',
      'rating' : 2,
      'leftBy' : 'Ilana Chalom',
      'post' : 'Linear Algebra',
      'text' : "Short review text review text review text review text review text review text review text review text",
    },
    {
      'title' : 'Learned a Lot!',
      'rating' : 4,
      'leftBy' : 'Anonymous',
      'post' : 'Piano Lessons',
      'text' : "Review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text review text",
    },
  ]

  const fetchData = async () => {
    try {
      const userInfo = await axios.get(`${api}/profiles/${params.id}`);
      setProfile(userInfo.data.data);
      const posts = await axios.get(`${api}/allPosts/findAllByUserId/${userInfo.data.data._id}`);
      if (posts.data.length !== 0) {
        setPosts(posts.data);
      }
      const picUrl = await axios.get(`${api}/profilePics/get/${userInfo.data.data.profilePicKey}`);
      setImgUrl(picUrl.data.imageUrl);
    } catch (error) {
      console.error('Error fetching posts', error);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchData();
  }, [api]);

  if (loading) return ( <> <Loader /> </>);

  return (
    <>
      <Navbar />
      <div className="flex justify-evenly items-center bg-blue-300 py-16 px-16">
        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl font-extrabold font-sans uppercase text-black">{profileData.firstName} {profileData.lastName} - {profileData.department}
                                            {profileData.graduationYear ? `, ${profileData.graduationYear}` : ''}</h1>
          <p className="text-s underline font-light mb-2">{profileData.email}</p>
          <p className="text-gray-700 text-base">{profileData.description}</p>
        </div>
        <div className="flex-none flex flex-col items-center mx-8">
          <img className="w-48 h-48 snap-center rounded-md" src={imgUrl} alt={`${profileData.firstName}`} />
          <RatingStars rating={4.5} starSize={26} numReviews={42} className="mt-2"/>
          <div className="flex mt-2 space-x-4">
            <Link href="/chat/" passHref>
              <button className="bg-custom-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">
                Message
              </button>
            </Link>
              <button className="bg-custom-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md" onClick={() => compareAvail()}>
                Compare Availability
              </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-blue-300 relative">
        <div className="ml-8 flex items-end">
          { ["Posts", "Reviews"].map((value, index) => {
            return (
              <button 
                key={index}
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
          { activeSection === "Posts" ?
            <div 
              className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2
              lg:grid-cols-3 gap-4"
            >
              { posts.map((post) => (
                <PostCard key={post._id} post={post} />
              )) }
            </div>
          :
            <div className="flex flex-col justify-center max-w-3xl">
              { reviews.map((review) => (
                <ReviewCard 
                  review={review}
                  className="mb-4 bg-white rounded-lg shadow-md"
                />
              )) }
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default Page;
