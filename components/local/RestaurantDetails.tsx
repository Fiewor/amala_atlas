// app/components/RestaurantDetails.tsx
import React from 'react';
import Header from './Header';
import EssentialInfo from './EssentialInfo';
import AuthenticityScore from './AuthenticityScore';
import ImagesSection from './ImagesSection';
import ReviewsSection from './ReviewsSection';
import VerifyButton from './VerifyButton';

interface RestaurantDetailsProps {
  name: string;
  subtitle: string;
  address: string;
  phone: string;
  hours: string;
  priceRange: string;
  authenticityScore: number;
  authenticityDescription: string;
  mainImage: string;
  sideImages: string[];
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

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({
  name,
  subtitle,
  address,
  phone,
  hours,
  priceRange,
  authenticityScore,
  authenticityDescription,
  mainImage,
  sideImages,
  reviews,
}) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Header />
      <div className="p-4 space-y-4 max-w-4xl mx-auto">
        <div className="text-sm text-gray-400">Lagos / Amala Restaurants</div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="flex gap-2">
            <button className="text-gray-400">Share</button>
            <button className="text-gray-400">Favorite</button>
          </div>
        </div>
        <p className="text-gray-400">{subtitle}</p>
        <ImagesSection mainImage={mainImage} sideImages={sideImages} />
        <EssentialInfo address={address} phone={phone} hours={hours} priceRange={priceRange} />
        <AuthenticityScore score={authenticityScore} description={authenticityDescription} />
        <VerifyButton />
        <ReviewsSection reviews={reviews} />
      </div>
    </div>
  );
};

export default RestaurantDetails;