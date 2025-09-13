export interface MockPlace {
  place_id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  openHours: string;
  priceBand: string;
  photoUrl?: string;
  openHour?: string;
  openPeriod?: "AM" | "PM";
  closeHour?: string;
  closePeriod?: "AM" | "PM";
  rating?: number;
  verifiedCount?: number;
}
