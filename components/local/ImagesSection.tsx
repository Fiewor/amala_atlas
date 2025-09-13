// app/components/ImagesSection.tsx
import React from 'react';
import Image from 'next/image';

interface ImagesSectionProps {
  mainImage: string;
  sideImages: string[];
}

const ImagesSection: React.FC<ImagesSectionProps> = ({ mainImage, sideImages }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden">
        <Image src={mainImage} alt="Main dish" fill className="object-cover" />
      </div>
      <div className="grid grid-rows-2 gap-4">
        {sideImages.map((img, index) => (
          <div key={index} className="relative h-24 md:h-32 rounded-2xl overflow-hidden">
            <Image src={img} alt={`Side image ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesSection;