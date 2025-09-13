import React from 'react';

interface ErrorResponseProps {
  type: string;
  message?: string;
}

const ErrorResponse: React.FC<ErrorResponseProps> = ({ type, message }) => {
  let content;

  switch (type) {
    case 'noRestaurant':
      content = (
        <div className="flex items-center gap-2 text-gray-400">
          <span className='animate-bounce'>😕</span>
          <p>Sorry, no restaurants were found for your request. Try a different location or cuisine!</p>
        </div>
      );
      break;
    case 'apiFailure':
      content = (
        <div className="flex items-center gap-2 text-red-400">
          <span>❌</span>
          <p>
            Oops! Something went wrong.{' '}
            {message ? message : 'Please try again or check your connection.'}
          </p>
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <div className="flex items-start gap-2 max-w-md mr-auto">
      <div className="bg-[#1E1E1E] text-white px-4 py-4 rounded-2xl border-2 border-lime-500 shadow w-full">
        {content}
      </div>
    </div>
  );
};

export default ErrorResponse;