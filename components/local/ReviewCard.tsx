// app/components/ReviewCard.tsx
import React from 'react';
import Image from 'next/image';

interface ReviewCardProps {
  userName: string;
  userImage: string;
  timeAgo: string;
  rating: number;
  text: string;
  likes: number;
  comments: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  userImage,
  timeAgo,
  rating,
  text,
  likes,
  comments,
}) => {
  return (
    <div className="border-b border-gray-800 pb-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 relative rounded-full overflow-hidden">
          <Image src={userImage} alt={userName} fill className="object-cover" />
        </div>
        <div>
          <p className="font-semibold">{userName}</p>
          <p className="text-sm text-gray-400">{timeAgo}</p>
        </div>
      </div>
      <div className="flex my-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? 'text-lime-500' : 'text-gray-600'}>★</span>
        ))}
      </div>
      <p className="text-gray-300">{text}</p>
      <div className="flex gap-4 mt-2 text-gray-400 text-sm">
        <span>👍 {likes}</span>
        <span>💬 {comments}</span>
      </div>
    </div>
  );
};

export default ReviewCard;