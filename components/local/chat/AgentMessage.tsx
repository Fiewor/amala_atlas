import React from 'react';
import RestaurantCard from './RestaurantCard';

interface AgentMessageProps {
  text: string;
  card?: {
    name: string;
    description: string;
    image: string;
  };
}

const AgentMessage: React.FC<AgentMessageProps> = ({ text, card }) => {
  return (
    <div className="flex items-start gap-2 max-w-md mr-auto">
      <div className="bg-[#1E1E1E] text-white px-4 py-4 rounded-2xl border-2 border-lime-500 shadow w-full">
        <p className="mb-2">{text}</p>
        {card && <RestaurantCard name={card.name} description={card.description} image={card.image} />}
      </div>
    </div>
  );
};

export default AgentMessage;