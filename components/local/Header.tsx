// app/components/Header.tsx
import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-[#0A0A0A] p-4 border-b border-gray-800">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-lime-500 rounded" /> {/* Logo placeholder */}
        <span className="font-bold text-lime-500">Taste of Naija</span>
      </div>
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search for restaurants"
          className="w-full bg-[#1E1E1E] text-white px-4 py-2 rounded-full outline-none placeholder-gray-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="text-gray-400">❤️</button>
        <div className="w-8 h-8 rounded-full bg-gray-600" /> {/* Profile placeholder */}
      </div>
    </header>
  );
};

export default Header;