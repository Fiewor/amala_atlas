export type Restaurant = {
  name: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  openHours: string;
  priceBand: string;
  photoUrl?: string;
  openHour?: string;
  openPeriod?: "AM" | "PM";
  closeHour?: string;
  closePeriod?: "AM" | "PM";
};