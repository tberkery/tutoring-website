import React, { useState } from 'react';
import { StarIcon as FilledStar } from '@heroicons/react/24/solid';
import { StarIcon as OutlineStar } from '@heroicons/react/24/outline';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    if (rate === rating) {
      setRating(0);
    } else {
      setRating(rate);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRating(star)}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          className="cursor-pointer"
        >
          {rating >= star ? (
            <FilledStar className="w-6 h-6 text-yellow-500" />
          ) : (
            <OutlineStar className="w-6 h-6 text-gray-400" />
          )}
        </button>
      ))}
    </div>
  );
};

export default StarRating;
