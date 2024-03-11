"use client";
import React from 'react';

interface Post {
  id: number;
  username: string;
  courseId: string;
  title: string;
  description: string;
  imageUrl?: string;
  price: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const defaultImage = '/jhulogo.jpeg';
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        src={post.imageUrl || defaultImage}
        alt={post.title}
      />
      <div className="px-6 py-4">
        <div className="mb-2">
            <div className="font-bold text-xl">{post.title}</div>
            <p className="text-gray-600 text-sm">{post.courseId}</p>
        </div>
        <p className="text-gray-700 text-base">{post.description}</p>
        <p className="text-gray-600 text-sm">From ${post.price}</p>
        <p className="text-gray-600 text-sm">Created by {post.username}</p>
      </div>
    </div>
  );
};

export default PostCard;
