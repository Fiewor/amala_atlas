// app/components/AuthenticityScore.tsx
import React from 'react';

interface AuthenticityScoreProps {
  score: number;
  description: string;
}

const AuthenticityScore: React.FC<AuthenticityScoreProps> = ({ score, description }) => {
  return (
    <div className="bg-[#1E1E1E] p-4 rounded-2xl">
      <h3 className="text-lg font-semibold">Authenticity Score</h3>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{score}%</span>
        <div className="flex-1 h-2 bg-gray-600 rounded-full">
          <div className="h-2 bg-lime-500 rounded-full" style={{ width: `${score}%` }} />
        </div>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default AuthenticityScore;