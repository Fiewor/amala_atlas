import React from 'react';

interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ value, onChange }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your review here..."
      className="w-full bg-[#0A0A0A] text-white p-3 rounded-lg outline-none resize-none h-24"
    />
  );
};

export default CommentInput;