"use client";
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import RatingStars from './RatingStars';
import axios from 'axios';

type review = {
  postId: string,
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
        <h3 className='text-2xl font-bold'>{review.title}</h3>
        <p className='text-sm mt-0.5 text-gray-800'>
          {'Left by '}
          <span 
            className={`font-bold 
            ${anonymous ? '' : 'cursor-pointer hover:underline'}`}
          >
            {leftByName}
          </span>
        </p>
      </div>
      <RatingStars rating={review.rating}/>
      <p className='text-sm mt-1 text-gray-800'>
        Review of <span className='font-bold cursor-pointer hover:underline'>
          POST NAME
        </span>
      </p>
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