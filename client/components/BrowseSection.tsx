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
        username: 'Nolan Fogarty',
        title: 'OOSE',
        courseId: 'EN.601.421',
        description: 'I will teach you all about OOSE and how to make a great project!',
        imageUrl: "alsbdf",
        price: '150'
      },
      {
        id: 2,
        username: 'Nolan Fogarty',
        title: '',
        courseId: '',
        description: '',
        imageUrl: null,
        price: ''
      },
      {
        id: 3,
        username: 'Nolan Fogarty',
        title: 'OOSE',
        courseId: 'EN.601.421',
        description: 'I will teach you all about OOSE and how to make a great project!',
        classId: null,
        price: '150'
      },
];

const PostsSection: React.FC = () => {
  const [posts, setPosts] = useState(samples); 

  const fetchPosts = async () => {
    try {
      const posts = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allPosts`);
      console.log('setting posts to:', posts.data);
      setPosts(posts.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  });
  
  
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