"use client";
import React from 'react';
import { useRouter } from "next/navigation";

interface Post {
  _id: number;
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
  const router = useRouter();

  const postUrl = post.courseName ? `/post/course/${post._id}` : `/post/activity/${post._id}`;

  const handleClick = () => {
    router.push(postUrl);
  }

  return ( <> 
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" onClick={handleClick}>
      <img
        className="w-full h-24 object-cover"
        src={post.imageUrl || defaultImage}
        alt={post.title}
      />
      <div className="px-6 py-4">
        <div className="mb-2">
            <div className="font-bold text-xl">{post.courseName ? post.courseName : post.activityTitle}</div>
            <p className="text-gray-600 text-sm">{post.courseNumber}</p>
        </div>
        <p className="text-gray-700 text-base">{post.description ? post.description : post.activityDescription}</p>
        <div className="relative py-2"> 
          <p className="text-gray-600 text-sm absolute left-0">From ${post.price}</p>
          <p className="text-gray-600 text-sm absolute right-0">Created by {post.username}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default PostCard;
