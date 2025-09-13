// app/components/EssentialInfo.tsx
import React from 'react';

interface EssentialInfoProps {
  address: string;
  phone: string;
  hours: string;
  priceRange: string;
}

const EssentialInfo: React.FC<EssentialInfoProps> = ({ address, phone, hours, priceRange }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">Essential Information</h2>
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <span>📍</span> {address}
        </div>
        <div className="flex items-center gap-2">
          <span>📞</span> {phone}
        </div>
        <div className="flex items-center gap-2">
          <span>🕒</span> {hours}
        </div>
        <div className="flex items-center gap-2">
          <span>💰</span> {priceRange}
        </div>
      </div>
    </div>
  );
};

export default EssentialInfo;