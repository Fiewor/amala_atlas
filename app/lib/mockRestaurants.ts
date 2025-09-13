export interface MockPlace {
  place_id: string;
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export const mockRestaurants: MockPlace[] = [
  {
    place_id: 'mock_1',
    name: 'Mama Cass',
    geometry: { location: { lat: 6.5244, lng: 3.3792 } },
  },
  {
    place_id: 'mock_2',
    name: 'Spicy Amala Place',
    geometry: { location: { lat: 6.5321, lng: 3.3645 } },
  },
  {
    place_id: 'mock_3',
    name: 'Iya Meta',
    geometry: { location: { lat: 6.5178, lng: 3.3708 } },
  },
  {
    place_id: 'mock_4',
    name: "Missy's Spot Canteen",
    geometry: { location: { lat: 6.5103, lng: 3.3856 } },
  },
  {
    place_id: 'mock_5',
    name: 'Amala Hut',
    geometry: { location: { lat: 6.5289, lng: 3.3901 } },
  },
];
