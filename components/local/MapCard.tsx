'use client';

import { MockPlace } from '@/lib/types';

interface MapCardProps {
  place: MockPlace;
}

const MapCard = ({ place }: MapCardProps) => {
  return (
    <div className='flex w-64 bg-white shadow-lg rounded-lg overflow-hidden'>
      <img
        src={place.photoUrl || '/amala.jpg'}
        alt={place.name}
        className='w-1/4 h-auto object-cover'
      />
      <div className='p-4 flex-1'>
        <h3 className='font-bold text-sm  text-black'>{place.name}</h3>
        <p className='text-sm font-semibold text-gray-800'>{`${place.address}, ${place.city}`}</p>
        <p className='text-sm font-semibold text-gray-600'>
          {place.priceBand} | {place.openHours}
        </p>
      </div>
    </div>
  );
};

export default MapCard;
