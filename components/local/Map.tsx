'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
// import { mockRestaurants } from '@/lib/mockRestaurants';
import { MockPlace } from '@/lib/types';

const Map = ({mockRestaurants}: {mockRestaurants: MockPlace[]}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const defaultLocation = { lat: 6.5244, lng: 3.3792 }; // Lagos, Nigeria

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: 'weekly',
      libraries: ['places'], // Load Places API for future use
    });

    loader.load().then(async () => {
      if (!mapRef.current) return;

      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary;

      // Try to get user's location, fallback to Lagos
      let center = defaultLocation;
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );
        center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      } catch (error) {
        console.warn(
          'Geolocation failed, using default location (Lagos)',
          error
        );
      }

      const map = new Map(mapRef.current, {
        center,
        zoom: 12,
        mapId: 'DEMO_MAP_ID', // Replace with custom map ID if provided
      });

      // Add markers for mock restaurants
      mockRestaurants.forEach((place: MockPlace) => {
        new AdvancedMarkerElement({
          map,
          position: place.geometry.location,
          title: place.name,
        });
      });

      // Placeholder for real Places API integration (uncomment when AI agent is ready)
      /*
      const { PlacesService } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: center,
          radius: 5000, // 5km radius
          type: "restaurant",
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            results.forEach((place) => {
              if (place.geometry?.location) {
                new AdvancedMarkerElement({
                  map,
                  position: place.geometry.location,
                  title: place.name,
                });
              }
            });
          }
        }
      );
      */
    });
  }, [mockRestaurants]);

  return <div ref={mapRef} className='w-full h-[50vh]' />;
};

export default Map;
