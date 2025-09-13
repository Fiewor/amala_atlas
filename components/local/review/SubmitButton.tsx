import React from 'react';

const SubmitButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="w-full bg-lime-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-lime-600 transition-colors"
    >
      Submit Review
    </button>
  );
};

export default SubmitButton;