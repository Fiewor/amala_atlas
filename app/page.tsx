"use client"
import React, { useState } from "react";
import RestaurantCard from "../components/local/RestaurantCard";
import SearchBox from "../components/local/SearchBox";
import AddRestaurantModal from "../components/local/AddRestaurantModal";
import Map from "@/components/local/Map";
import ChatWindow from "@/components/local/chat/ChatWindow";
import { MockPlace } from "@/lib/types";
import { mockRestaurants } from "@/lib/mockRestaurants";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { DialogTitle } from "@/components/ui/dialog";



export default function Home() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [restaurants, setRestaurants] = useState<MockPlace[]>(mockRestaurants);
  const [openChat, setOpenChat] = useState(false);

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
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center relative">
      <header className="w-full py-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2">Amala Atlas</h1>
        <p className="text-lg text-gray-300">Discover, submit, and verify the best Amala spots in Lagos</p>
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
      <div className="mt-8 w-full max-w-5xl px-4">
        <div className="bg-gray-800 rounded-lg h-64 flex items-center justify-center text-gray-400">
           <Map  mockRestaurants={filtered}/>
        </div>
      </div>

      {/* Floating Chatbot Icon */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-lime-600 hover:bg-lime-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center"
        aria-label="Open chat bot"
        onClick={() => setOpenChat(true)}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-circle">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7A8.38 8.38 0 0 1 3 16.5c-.3-.5-.5-1-.5-1.5a8.5 8.5 0 0 1 8.5-8.5c4.7 0 8.5 3.8 8.5 8.5z"></path>
        </svg>
      </button>

      {/* Chat Drawer */}
      <Drawer open={openChat} onOpenChange={setOpenChat} direction="bottom">
        <DrawerContent className="p-4 max-h-[90vh] overflow-hidden rounded-t-2xl">
          <DialogTitle >Chat with our Agent</DialogTitle>
          <div className="border-b border-gray-500 my-2" />
          <ChatWindow />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
