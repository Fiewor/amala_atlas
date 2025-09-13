'use client';

import { MockPlace } from '@/lib/types';

interface MapCardProps {
  place: MockPlace;
}




const MapCard = ({ place }: MapCardProps) => {
  // const router = useRouter();
  // Verified count and status
  const verifiedCount = place.verifiedCount ?? 0;
  const isVerified = verifiedCount > 0;

  // Render stars for rating (0-5)
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.round(rating) ? 'text-lime-500' : 'text-gray-600'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="w-72 bg-[#1E1E1E] shadow-lg rounded-2xl overflow-hidden text-white flex flex-col">
      {/* Badge above image */}
      <div className="flex justify-between items-center px-4 pt-4">
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${isVerified ? 'bg-lime-500 text-black' : 'bg-gray-700 text-gray-300'}`}>{isVerified ? 'Verified' : 'Unverified'}</span>
        <span className="text-xs text-gray-300 ml-2">{verifiedCount}</span>
      </div>
      <div className="flex flex-col items-center px-4 pb-4">
        <img
          src={place.photoUrl || '/amala.jpg'}
          alt={place.name}
          className="w-20 h-20 object-cover rounded-lg mt-2 mb-2 border-2 border-lime-500"
        />
        <h3 className="font-bold text-base mb-1 text-center w-full truncate">{place.name}</h3>
        <p className="text-xs text-gray-400 mb-2 text-center w-full truncate">{`${place.address}, ${place.city}`}</p>
        <div className="flex items-center gap-1 mb-2 justify-center">
          {renderStars(place.rating || 0)}
          <span className="text-xs text-gray-400">({place.rating?.toFixed(1) || 'N/A'})</span>
        </div>
        <button
          onClick={() => window.location.href = '/details'}
          className="mt-2 bg-lime-500 text-black px-3 py-1 rounded-full text-sm font-semibold hover:bg-lime-600 transition-colors w-full"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default MapCard;

