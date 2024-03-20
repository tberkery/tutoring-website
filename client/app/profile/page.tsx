"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; 
import "../../styles/global.css";
import { useUser } from '@clerk/clerk-react';
import PostCard from '../../components/PostCard';
import Navbar from "../../components/Navbar"
import Loader from '../../components/Loader';
import { use } from 'chai';

interface ActivityPost {
  _id: string;
  userId: string;
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

const Page: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [posts, setPosts] = useState<Post[]>([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState("../defaultimg.jpeg");
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const userInfo = await axios.get(`${api}/profiles/getByEmail/${user.primaryEmailAddress.toString()}`);
      console.log(user);
      setProfileData(userInfo.data.data[0]);
      const posts = await axios.get(`${api}/allPosts/findAllByUserId/${userInfo.data.data[0]._id}`);
      if (posts.data.length !== 0) {
        setPosts(posts.data);
      }
    } catch (error) {
      console.error('Error fetching posts', error);
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    fetchData();
  }, [api, user]);

  if (loading || !profileData) {
    return (
      <>
      <Loader />
      </>
    )
  }
  return (
    <>
      <Navbar />
      <div className="flex justify-between items-center bg-blue-300 pt-16 pb-16 pl-32 pr-32">
      <div className="flex-1 mr-5">
        <h1 className="text-2xl font-extrabold font-sans uppercase text-black">{profileData.firstName} {profileData.lastName} - {profileData.department}
                                           {profileData.graduationYear ? `, ${profileData.graduationYear}` : ''}</h1>
        <p className="text-s underline font-light mb-2">{profileData.email}</p>
        <p className="text-gray-700 text-base">{profileData.description}</p>
      </div>
      <div className="flex-none pl-32 flex flex-col items-center">
        <img className="w-268 h-268 md:w-48 md:h-48 snap-center rounded-md" src={imgUrl} alt={`${profileData.firstName}`} />
        <div className="flex mt-4 space-x-4">
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
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((posts) => (
              <PostCard key={posts._id} post={posts} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
