// app/components/ReviewsSection.tsx
import React from 'react';
import ReviewCard from './ReviewCard';

interface ReviewsSectionProps {
  reviews: Array<{
    userName: string;
    userImage: string;
    timeAgo: string;
    rating: number;
    text: string;
    likes: number;
    comments: number;
  }>;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Community Reviews</h2>
      {reviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
    </div>
  );
};

export default ReviewsSection;