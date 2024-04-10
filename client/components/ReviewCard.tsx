import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import RatingStars from './RatingStars';
import axios from 'axios';

type Review = {
  _id: string,
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

type Props = {
  review: Review,
  loggedInUserId: string,
} & HTMLAttributes<HTMLDivElement>

const ReviewCard: FC<Props> = (props) => {
  const review = props.review;
  const reviewId = review._id;
  const loggedInUserId = props.loggedInUserId;
  const api = process.env.NEXT_PUBLIC_BACKEND_URL;
  const textRef = useRef<HTMLParagraphElement>(null);

  const [showFull, setShowFull] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [leftByName, setLeftByName] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const fetchData = async () => {
    const profileEndpoint = `${api}/profiles/${review.reviewerId}`;
    const profileResponse = await axios.get(profileEndpoint);
    const profile = profileResponse.data.data;
    if (profile) {
      setLeftByName(`${profile.firstName} ${profile.lastName}`);
      setAnonymous(props.review.isAnonymous);
    } else {
      setAnonymous(true);
    }
    if (loggedInUserId === review.reviewerId) {
      setShowDeleteButton(true);
    }
  }

  const isTextClamped = (element: Element) => {
    return element.scrollHeight > element.clientHeight;
  }

  useEffect(() => { fetchData() }, []);

  useEffect(() => { setIsClamped(isTextClamped(textRef.current)) }, [])

  const handleDeleteReview = async () => {
    try {
      const response = await axios.delete(`${api}/postReviews/${review._id}`);
      alert('Review deleted successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

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
          {anonymous ?
            <span className='font-bold'>Anonymous</span>
            :
            <a className='font-bold cursor-pointer hover:underline' href={`/profile/${review.posterId}`}>
              {leftByName}
            </a>
          }
        </p>
      </div>
      <RatingStars rating={review.rating} className='mb-2'/>
      <p className={`mt-1 ${showFull ? '' : 'line-clamp-2'}`} ref={textRef}>
        {review.reviewDescription}
      </p>
      {isClamped &&
        <div className='flex justify-center'>
          {showFull ? 
            <button className='text-sm text-gray-500 mt-1 hover:underline' onClick={() => setShowFull(false)}>
              Hide Full Review
            </button>
            :
            <button className='text-sm text-gray-500 mt-1 hover:underline' onClick={() => setShowFull(true)}>
              Show Full Review...
            </button>
          }
        </div>
      }
      <div className="flex justify-end">
        {showDeleteButton && (
          <button onClick={handleDeleteReview} className='text-red-500 font-semibold hover:underline mt-2'>
            Delete my review
          </button>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;
