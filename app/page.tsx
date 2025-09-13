'use client';
import React, { useState } from 'react';
import RestaurantCard from '../components/local/RestaurantCard';
import SearchBox from '../components/local/SearchBox';
import AddRestaurantModal from '../components/local/AddRestaurantModal';
import Map from '@/components/local/Map';
import ChatWindow from '@/components/local/chat/ChatWindow';
import { MockPlace } from '@/lib/types';
import { mockRestaurants } from '@/lib/mockRestaurants';

export default function Home() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [restaurants, setRestaurants] = useState<MockPlace[]>(mockRestaurants);

  const filtered = restaurants.filter(
    r =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.address.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddRestaurant = (data: Partial<MockPlace>) => {
    console.log('New restaurant added:', data);
    // In real app, send to backend
    setRestaurants(prev => [
      {
        ...data,
        geometry: {
          location: {
            lat: data.geometry?.location.lat || 0,
            lng: data.geometry?.location.lng || 0,
          },
        },
        openHours: data.openHours || '',
        priceBand: data.priceBand || '',
      } as MockPlace,
      ...prev,
    ]);
  };

  return (
    <div className='min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center'>
      <header className='w-full py-8 flex flex-col items-center'>
        <h1 className='text-3xl font-bold mb-2'>Amala Atlas</h1>
        <p className='text-lg text-gray-300'>
          Discover, submit, and verify the best Amala spots in Lagos
        </p>
      </header>
      <SearchBox value={search} onChange={setSearch} onSearch={() => {}} />
      <button
        className='bg-lime-600 text-white px-6 py-2 rounded mb-4 hover:bg-lime-700'
        onClick={() => setShowModal(true)}
      >
        Add Amala Spot
      </button>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        {filtered.map((r, i) => (
          <RestaurantCard key={i} restaurant={r} />
        ))}
      </div> */}
      <AddRestaurantModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddRestaurant}
      />
      {/* Map UI placeholder */}
      <div className='mt-8 w-full max-w-5xl px-4'>
        <div className='bg-gray-800 rounded-lg h-64 flex items-center justify-center text-gray-400'>
          <Map />
          {/* <ChatWindow /> */}
        </div>
      </div>
    </div>
  );
}
