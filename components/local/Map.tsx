'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MockPlace } from '@/lib/types';
import MapCard from './MapCard';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
// Removed Popover imports, using custom popup

const Map = ({ mockRestaurants }: { mockRestaurants: MockPlace[] }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const defaultLocation = { lat: 6.5244, lng: 3.3792 }; // Lagos, Nigeria

  const [selectedPlace, setSelectedPlace] = useState<MockPlace | null>(null);
  // Remove popoverOpen, use selectedPlace only

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(async () => {
      if (!mapRef.current) return;

      const { Map } = (await google.maps.importLibrary(
        'maps'
      )) as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary(
        'marker'
      )) as google.maps.MarkerLibrary;

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
        zoom: 10, // Your preferred zoom level
        mapId: 'DEMO_MAP_ID',
      });

      const markers = mockRestaurants.map((place: MockPlace) => {
        const marker = new AdvancedMarkerElement({
          map,
          position: place.geometry.location,
          title: place.name,
        });
        marker.addListener('click', () => {
          setSelectedPlace(place);
        });
        return marker;
      });

      new MarkerClusterer({
        map,
        markers,
        renderer: {
          render: ({ count, position }) => {
            const div = document.createElement('div');
            div.className =
              'bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center';
            div.textContent = `${count}`;
            return new AdvancedMarkerElement({
              map,
              position,
              content: div,
            });
          },
        },
      });

      // Placeholder for real Places API integration (uncomment when AI agent is ready)
      /*
      const { PlacesService } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: center,
          radius: 5000,
          type: "restaurant",
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const placeMarkers = results.map((place) => {
              if (place.geometry?.location) {
                const marker = new AdvancedMarkerElement({
                  map,
                  position: place.geometry.location,
                  title: place.name,
                });
                marker.addListener("click", () => {
                  setSelectedPlace(place);
                });
                return marker;
              }
              return null;
            }).filter((marker): marker is google.maps.marker.AdvancedMarkerElement => marker !== null);
            new MarkerClusterer({ map, markers: placeMarkers });
          }
        }
      );
      */
    });
  }, [mockRestaurants]);

  return (
    <div className='relative w-full h-[50vh]'>
      <div ref={mapRef} className='absolute inset-0 w-full h-full' />
      {selectedPlace && (
        <div className='fixed left-1/2 bottom-8 z-50 -translate-x-1/2 flex flex-col items-center'>
          <div className='relative'>
            <button
              className='absolute -top-4 -right-4 z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700'
              aria-label='Close'
              onClick={() => setSelectedPlace(null)}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='4' y1='4' x2='16' y2='16' />
                <line x1='16' y1='4' x2='4' y2='16' />
              </svg>
            </button>
            <MapCard place={selectedPlace} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
