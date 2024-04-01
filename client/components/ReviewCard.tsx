"use client";
import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import RatingStars from './RatingStars';

type review = {
  title: string,
  rating: number,
  leftBy: string,
  post: string,
  text: string
}

type props = {
  review: review,
} & HTMLAttributes<HTMLDivElement>

const ReviewCard : FC<props> = (props) => {
  const review = props.review;
  const textRef = useRef<HTMLParagraphElement>(null);
  const [showFull, setShowFull] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  const isTextClamped = (element : Element) => {
    return element.scrollHeight > element.clientHeight;
  }

  useEffect(() => { setIsClamped(isTextClamped(textRef.current)) }, [])

  return (
    <div className={`${props.className} px-4 py-3`}>
      <div className='flex justify-between'>
        <h3 className='text-2xl font-bold'>{review.title}</h3>
        <p className='text-sm mt-0.5 text-gray-800'>
          Left by <span className='font-bold cursor-pointer hover:underline'>
            {review.leftBy}
          </span>
        </p>
      </div>
      <RatingStars rating={review.rating}/>
      <p className='text-sm mt-1 text-gray-800'>
        Review of <span className='font-bold cursor-pointer hover:underline'>
          {review.post}
        </span>
      </p>
      <p 
        className={`mt-1 ${showFull ? '' : 'line-clamp-2'}`} ref={textRef}
      >
        {review.text}
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