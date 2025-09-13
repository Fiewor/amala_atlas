import React from 'react';

interface FormHeaderProps {
  onClose: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-white">Leave a Review</h2>
      <button onClick={onClose} className="text-gray-400 hover:text-white">
        ✕
      </button>
    </div>
  );
};

export default FormHeader;