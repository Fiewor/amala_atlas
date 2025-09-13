import { MockPlace } from "@/lib/types";
import Image from "next/image";
import React from "react";

const RestaurantCard: React.FC<{ restaurant: MockPlace }> = ({ restaurant }) => (
  <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
    {restaurant.photoUrl && (
      <Image src={restaurant.photoUrl} alt={restaurant.name} width={320} height={160} className="w-80 h-40 object-cover rounded" />
    )}
    <div className="font-bold text-lg">{restaurant.name}</div>
    <div className="text-sm text-gray-600">{restaurant.address}, {restaurant.city}, {restaurant.country}</div>
    <div className="text-xs text-gray-500">Open: {restaurant.openHours}</div>
    <div className="text-xs text-gray-500">Price: {restaurant.priceBand}</div>
  </div>
);

export default RestaurantCard;
