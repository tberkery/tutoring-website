"use client";
import React from 'react';

interface Post {
  userId: number;
  username: string;
  courseName: string;
  activityTitle: string;
  courseNumber: string;
  title: string;
  description: string;
  imageUrl?: string;
  price: number;
  activityDescription: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const defaultImage = '/jhulogo.jpeg';
  return ( <> 
    <div className="max-w-sm overflow-hidden py-2">
      <img
        className="w-full aspect-ratio: 4 / 3 object-cover rounded"
        src={post.imageUrl || defaultImage}
        alt={post.title}
      />
      <div className="px-2 py-2">
        <div className="py-0.5">
            <div className="text-2xl font-bold font-sans text-slate-700 uppercase">{post.courseName ? post.courseName : post.activityTitle}</div>
            <p className="text-slate-500 text-sm font-sans">{post.courseNumber}</p>
        </div>
        <div className="py-1 flex justify-between"> 
          <p className="text-slate-600 text-sm font-sans">From ${post.price}</p>
          <p className="text-slate-600 text-sm font-sans">Created by <a href="/profile" className="font-semibold">User</a>{post.username}</p>
        </div>
        <p className="text-slate-800 text-base font-sans">{post.description ? post.description : post.activityDescription}</p>
      </div>
    </div>
    </>
  );
};

export default PostCard;
