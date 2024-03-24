"use client";
import React, { FC, useEffect, useState } from "react";
import "@/styles/global.css";
import axios from "axios";
import Navbar from "@/components/Navbar"
import Link from 'next/link';
import Loader from "@/components/Loader";

interface Profile {
  affiliation: string;
  department: string;
  description: string;
  email: string;
  firstName: string;
  graduationYear: string;
  lastName: string;
  posts: string[];
}

const Page : FC = ({ params }: { params : { id: string }}) => {
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [loading, setLoading] = useState(true);
  const [profileData, setProfile] = useState<Profile>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${api}/profiles/${params.id}`);
        setProfile(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user', error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [api]);

  if (loading) return ( <> <Loader /> </>);

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
      <img className="w-268 h-268 md:w-48 md:h-48 snap-center rounded-md" src="../defaultimg.jpeg" alt={`${profileData.firstName}`} />
      <div className="flex mt-4 space-x-4">
        <Link href="/profile/" passHref>
          <button className="bg-custom-blue hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md">
            Message
          </button>
        </Link>
      </div>
    </div>
  </div>
    {/* <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((posts) => (
            <PostCard key={posts._id} post={posts} />
        ))}
      </div>
    </div> */}
  </>
  );
};

export default Page;
