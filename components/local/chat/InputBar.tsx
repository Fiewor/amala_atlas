// app/components/InputBar.tsx
import React from 'react';
import { Icon } from '@iconify/react';

interface InputBarProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
}

const InputBar: React.FC<InputBarProps> = ({ input, setInput, onSend }) => {
  return (
    <div className="flex items-center bg-[#1E1E1E] rounded-full px-4 py-2 shadow-md">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Find your next favorite meal..."
        className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
      />
      <button
        onClick={onSend}
        disabled={!input.trim()}
        className="w-8 h-8 rounded-full bg-lime-500 text-white flex items-center justify-center disabled:opacity-50"
      >
        <Icon icon="mdi:send" width="20" height="20" />
      </button>
    </div>
  );
};

export default InputBar;