import React from 'react';
import SubmitButton from './SubmitButton';
import RatingInput from './RatingInput';
import CommentInput from './CommentIput';
import FormHeader from './FormHeader';
interface ReviewFormProps {
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onClose }) => {
  const [comment, setComment] = React.useState('');
  const [rating, setRating] = React.useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reviewData = { comment, rating };
    console.log('Submitted Review:', reviewData);
    onClose(); // Close the form after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] p-6 rounded-2xl shadow-lg w-full max-w-md">
        <FormHeader onClose={onClose} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <CommentInput value={comment} onChange={setComment} />
          <RatingInput value={rating} onChange={setRating} />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;