import React from 'react';

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
}

const RatingInput: React.FC<RatingInputProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-white">Rating:</label>
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="bg-[#0A0A0A] text-white p-2 rounded-lg outline-none"
      >
        <option value={0}>Select Rating</option>
        {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num} Star{num > 1 ? 's' : ''}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RatingInput;