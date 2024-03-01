"use client";
import React from 'react';
import PostCard from './PostCard'; 
// Adjust the path as needed

const posts = [
    {
        id: 1,
        username: 'Nolan Fogarty',
        title: 'OOSE',
        courseId: 'EN.601.421',
        description: 'I will teach you all about OOSE and how to make a great project!',
        imageUrl: "",
        price: '150'
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
    const isUserSignedIn = true; // This should be determined by your auth logic
  
  
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