// app/components/RestaurantCard.tsx
import React from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';

interface RestaurantCardProps {
  name: string;
  description: string;
  image: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ name, description, image }) => {
  return (
    <div className="bg-[#0A0A0A] rounded-lg overflow-hidden shadow-md">
      <div className="flex items-center justify-between p-2">
        <div>
          <h3 className="text-white font-semibold">{name}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <div className="w-12 h-12 relative">
          <Image src={image} alt={name} fill className="object-cover rounded" />
        </div>
      </div>
      <div className="flex justify-around bg-[#1E1E1E] py-1 text-lime-500 text-xs">
        <button className="flex items-center gap-1">
        <Icon icon="mdi:map-outline" width="20" height="20" />   Map
        </button>
        <button className="flex items-center gap-1">
          <Icon icon="mdi:compass-outline" width="20" height="20" />  Directions
        </button>
        <button className="flex items-center gap-1">
          <Icon icon="mdi:content-save-outline" width="20" height="20" />  Save
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;