"use client";
import React, { FC, useEffect, useState } from "react";
import PostCard from './PostCard'; 
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import { profile } from "console";

const samples = [
    {
        id: 1,
        username: 'TutorHub Team',
        title: 'OOSE',
        courseId: 'EN.601.421',
        description: 'You have not made a tutor post yet!',
        price: '0'
      },
];

const PostsSection: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [profileData, setProfileData] = React.useState(null);
  const [posts, setPosts] = useState(samples); 

  const fetchProfile = async () => {
     if (!user) return;
    try {
      console.log('\n\nstage 1...\n\n')
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/getByEmail/${user.primaryEmailAddress.toString()}`);
      console.log(response.data);
      setProfileData(response.data);
      const posts = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allPosts/findAllByUserId/${response.data.data[0]._id}`);
      console.log('posts.data type: ' + typeof posts.data);
      console.log(posts.data);
      if (posts.data.length !== 0) {
        setPosts(posts.data);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);
  
  
    return (
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  };
  
  export default PostsSection;