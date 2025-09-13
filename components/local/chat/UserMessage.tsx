import React from 'react';

interface UserMessageProps {
  text: string;
}

const UserMessage: React.FC<UserMessageProps> = ({ text }) => {
  return (
    <div className="flex items-start gap-2 max-w-md ml-auto mb-4">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-lime-500 text-white font-bold text-sm">
        US
      </div>
      <div className="bg-[#1E1E1E] text-white px-4 py-2 rounded-2xl shadow">
        {text}
      </div>
    </div>
  );
};

export default UserMessage;