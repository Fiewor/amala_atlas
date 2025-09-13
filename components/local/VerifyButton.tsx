// app/components/VerifyButton.tsx
"use client";
import React, { useState } from 'react';
import ReviewForm from './review/ReviewForm';

const VerifyButton: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsFormOpen(true)}
        className="w-full md:w-auto bg-lime-500 text-black px-4 py-2 rounded-full flex items-center justify-center gap-2"
      >
        <span>✅</span> Verify this Location
      </button>
      {isFormOpen && <ReviewForm onClose={() => setIsFormOpen(false)} />}
    </>
  );
};

export default VerifyButton;