"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import RatingStars from './RatingStars';

interface Post {
  _id: string;
  userId: string;
  username?: string;
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
  __v: number;
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

  const formatPrice = (price : number) => {
    if (!price || price == 0) {
      return "Free!"
    } else {
      return `From $${price}`;
    }
  }

  return (<> 
    <div 
      className="max-w-sm overflow-hidden py-2 bg-white rounded shadow-lg" 
      onClick={handleClick}
    >
      <img
        className="w-full h-32 object-cover"
        src={post.imageUrl || defaultImage}
        alt="Post Image"
      />
      <div className="px-4 py-2 border-t">
        <div className="text-2xl font-bold font-sans text-slate-700 uppercase">{post.courseName ? post.courseName : post.activityTitle}</div>
        { post.courseNumber ? 
          <div className="flex justify-between items-center">
            <p className="text-slate-600 text-sm font-sans">
              {post.courseNumber}
            </p>
            <RatingStars rating={3.8}/>
          </div>
        :
          <div className="flex justify-center">
            <RatingStars rating={3.8}/>
          </div>
        }
        <div className="my-1 flex justify-between">
          <p className="text-slate-600 text-sm font-sans">{formatPrice(post.price)}</p>
          <p className="text-slate-600 text-sm font-sans">
            {"Created by "}
            <a href={`/profile/` + post.userId} className="font-semibold">
              User
            </a>
          </p>
        </div>
        <p className="text-slate-800 text-base font-sans line-clamp-2">
          { post.description ? post.description : post.activityDescription }
        </p>
      </div>
    </div>
  </>);
};

export default PostCard;
