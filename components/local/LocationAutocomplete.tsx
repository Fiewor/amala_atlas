// app/components/local/LocationAutocomplete.tsx
import React, { useState } from "react";

interface Prediction {
  description: string;
  place_id: string;
}

interface LocationAutocompleteProps {
  onSelect: (prediction: Prediction) => void;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({ onSelect }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPredictions = async (val: string) => {
    setLoading(true);
    const res = await fetch(`/api/places?input=${encodeURIComponent(val)}`);
    const data = await res.json();
    setResults(data.predictions || []);
    setLoading(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          if (e.target.value.length > 2) fetchPredictions(e.target.value);
          else setResults([]);
        }}
        placeholder="Search location..."
        className="w-full bg-[#0A0A0A] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-lime-500 outline-none"
      />
      {loading && <div className="absolute right-3 top-2 text-xs text-gray-400">Loading...</div>}
      {results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-[#1E1E1E] text-white rounded-lg shadow-md mt-1 z-10">
          {results.map((pred) => (
            <li
              key={pred.place_id}
              className="px-4 py-2 cursor-pointer hover:bg-[#2A2A2A]"
              onClick={() => {
                onSelect(pred);
                setInput(pred.description);
                setResults([]);
              }}
            >
              {pred.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;