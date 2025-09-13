import React from "react";

interface SearchBoxProps {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, onSearch }) => (
  <div className="flex gap-2 items-center w-full max-w-xl mx-auto my-4">
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search Amala spots by name, address, or city..."
      className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
    />
    <button
      onClick={onSearch}
      className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-lime-700 transition"
    >
      Search
    </button>
  </div>
);

export default SearchBox;
