"use client";
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import RatingStars from './RatingStars';
import axios from 'axios';

type review = {
  postId: string,
  postName?: string,
  postType?: string,
  posterId: string,
  reviewerId: string,
  title?: string,
  reviewDescription: string,
  rating: number,
}

type props = {
  review: review,
} & HTMLAttributes<HTMLDivElement>

const ReviewCard : FC<props> = (props) => {
  const review = props.review;
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const textRef = useRef<HTMLParagraphElement>(null);

  const [showFull, setShowFull] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [leftByName, setLeftByName] = useState("");
  const [leftById, setLeftById] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const fetchData = async () => {
    const profileEndpoint = `${api}/profiles/${review.posterId}`;
    const profileResponse = await axios.get(profileEndpoint);
    const profile = profileResponse.data.data;
    setLeftByName(`${profile.firstName} ${profile.lastName}`);
    setLeftById(profile._id);
    setAnonymous(false); // TODO update
  }

  const isTextClamped = (element : Element) => {
    return element.scrollHeight > element.clientHeight;
  }

  useEffect(() => { fetchData() }, []);

  useEffect(() => { setIsClamped(isTextClamped(textRef.current)) }, [])

  return (
    <div className={`${props.className} px-4 py-3`}>
      <div className='flex justify-between'>
        <p className='text-xl text-gray-800'>
          {"Review of "}
          <a 
            className='font-bold hover:cursor-pointer hover:underline'
            href={`/post/${review.postType}/${review.postId}`}
          >
            {review.postName}
          </a>
        </p>
        <p className='text-sm mt-0.5 text-gray-800'>
          {'Left by '}
          <a 
            className={`font-bold 
            ${anonymous ? '' : 'cursor-pointer hover:underline'}`}
            href={`/profile/${review.posterId}`}
          >
            {leftByName}
          </a>
        </p>
      </div>
      <RatingStars rating={review.rating} className='mb-2'/>
      <p 
        className={`mt-1 ${showFull ? '' : 'line-clamp-2'}`} ref={textRef}
      >
        {review.reviewDescription}
      </p>
      { isClamped ?
        <div className='flex justify-center'>
          { showFull ? 
            <button 
              className='text-sm text-gray-500 mt-1 hover:underline'
              onClick={() => setShowFull(false)}
            >
              Hide Full Review
            </button>
          :
            <button 
              className='text-sm text-gray-500 mt-1 hover:underline'
              onClick={() => setShowFull(true)}
            >
              Show Full Review...
            </button>
          }
        </div>
      :
        ''
      }
    </div>
  );
}

export default ReviewCard;