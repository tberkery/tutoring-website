"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { Star } from 'lucide-react';
import BookmarkIcon from './ui/bookmark';

interface Post {
  _id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
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
  reviews: review[];
  tags?: string[];
  __v: number;
}

type review = {
  postId: string,
  postName?: string,
  postType?: string,
  posterId: string,
  reviewerId: string,
  title?: string,
  isAnonymous?: boolean,
  reviewDescription: string,
  rating: number,
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const defaultImage = '/jhulogo.jpeg';
  const [titleUnderline, setTitleUnderline] = useState(false);
  const [avgRating, setAvgRating] = useState(5);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();

  const postUrl = post.courseName ? `/post/course/${post._id}` : `/post/activity/${post._id}`;

  useEffect(() => {
    let total = 0;
    post.reviews.forEach(r => total += r.rating);
    setAvgRating(total / post.reviews.length);
  }, [post])

  const handleClick = () => {
    if (titleUnderline) {
      router.push(postUrl);
    }
  }

  const formatPrice = (price : number) => {
    if (!price || price == 0) {
      return "Free!"
    } else {
      return `From $${price}`;
    }
  }

  const toggleBookmark = () => {
    setIsBookmarked(prevState => !prevState);
  }

  return (<> 
    <div 
      className="max-w-sm overflow-hidden bg-white rounded shadow-lg
        cursor-pointer hover:-translate-y-2 transition duration-75" 
      onClick={handleClick}
      onMouseEnter={() => setTitleUnderline(true)}
      onMouseLeave={() => setTitleUnderline(false)}
    >
      {/* Bookmark icon positioned at the top right corner */}
      <div className="absolute top-2 right-2" onClick={toggleBookmark}>
        <BookmarkIcon className="h-6 w-6 text-gray-500" />
      </div>
      <img
        className="w-full h-48 object-cover"
        src={post.imageUrl || defaultImage}
        alt="Post Image"
      />
      <div className="border-t px-3 pb-3 pt-1">
        <div className="py-0.5">
          <div 
            className={`text-2xl font-bold font-sans text-slate-700 uppercase
            truncate ${titleUnderline ? 'underline' : ''}`}
          >
            {post.courseName ? post.courseName : post.activityTitle}
          </div>
        </div>
        <div className={`flex items-center justify-between ${post.courseNumber !== '' ? 'justify-between' : ''}`}>
          <p className="text-slate-500 text-sm font-sans">{post.courseNumber}</p>
          { post.reviews.length > 0 ?
            <div className="ratings flex items-center">
              <Star size={20} className="fill-black text-black inline-block mr-1"/>
              <h1 className="font-bold pt-0.25 pr-1">{avgRating.toFixed(1)}</h1>
              <a href="/reviews" className="text-slate-500">({post.reviews.length})</a>
            </div>
          :
            <></>
          }
        </div>
        <p className="text-slate-800 text-base font-sans line-clamp-2 cursor-pointe">
          {post.description ? post.description : post.activityDescription}
        </p>
        <div className="pt-1 flex justify-between"> 
          <p className="text-black text-sm font-sans font-bold">{formatPrice(post.price)}</p>
          <p className="text-black text-sm font-sans">
            {"Created by "}
            <a 
              href={`/profile/` + post.userId} 
              className="font-semibold hover:underline"
              onMouseEnter={() => setTitleUnderline(false)}
              onMouseLeave={() => setTitleUnderline(true)}
            >
              {post.userFirstName} {post.userLastName}
            </a>
          </p>
        </div>
      </div>
    </div>
  </>);
};

export default PostCard;
