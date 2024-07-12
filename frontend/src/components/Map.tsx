import React, { useEffect, useRef, useCallback } from 'react';

interface MapProps {
  listings: any[];
  className?: string;
  cityFilter?: string;
}

const Map: React.FC<MapProps> = ({ listings, className, cityFilter }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);
  const infoWindows = useRef<google.maps.InfoWindow[]>([]);

  console.log('Listings Length:', listings.length);

  const renderMarkers = useCallback(() => {
    if (!map.current) return;

    // Clear existing markers and info windows
    markers.current.forEach(marker => marker.setMap(null));
    markers.current = [];
    infoWindows.current.forEach(infoWindow => infoWindow.close());
    infoWindows.current = [];

    const filteredListings = cityFilter
      ? listings.filter(listing => listing.city.toLowerCase() === cityFilter.toLowerCase())
      : listings;

    console.log('Filtered Listings Length:', filteredListings.length);
    // If there are filtered listings, center the map on the first one
    if (filteredListings.length < listings.length) {
      const firstListing = filteredListings[0];
      const [lat, lng] = firstListing.google_map_location.replace('https://www.google.com/maps?q=', '').split(',').map(Number);
      map.current.setCenter({ lat, lng });
      map.current.setZoom(13);
    } else {
      // If no filtered listings, center on India
      map.current.setCenter({ lat: 20.5937, lng: 78.9629 });
      map.current.setZoom(5);
    }

    filteredListings.forEach(listing => {
      const [lat, lng] = listing.google_map_location.replace('https://www.google.com/maps?q=', '').split(',').map(Number);

      // Create a marker for each listing
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: map.current!,
        title: listing.house_name,
        icon: {
          url: './place.png', // Path to custom marker icon
          scaledSize: new google.maps.Size(40, 40), // Adjust size if needed
        },
      });
      markers.current.push(marker);

      // Create an info window for each marker
      const infoWindow = new google.maps.InfoWindow({
        content: `<div><h3>${listing.house_name}</h3></div>`,
      });
      infoWindows.current.push(infoWindow);

      // Add click event listener to show info window on marker click
      marker.addListener('click', () => {
        infoWindows.current.forEach(infoWindow => infoWindow.close());
        infoWindow.open(map.current!, marker);
      });
    });
  }, [listings, cityFilter]);

  useEffect(() => {
    const loadMap = () => {
      if (!window.google) {
        console.error('Google Maps JavaScript API not loaded');
        return;
      }

      // Initial center point and zoom level for India
      const initialCenter = { lat: 20.5937, lng: 78.9629 };
      const initialZoom = 5;

      map.current = new window.google.maps.Map(mapRef.current!, {
        zoom: initialZoom,
        center: initialCenter,
        draggable: true, // Enable manual zooming
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [
              {
                color: '#f5f5f5', // Light gray background
              },
            ],
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
              {
                color: '#ffffff', // White roads
              },
            ],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
              {
                color: '#e0f7fa', // Light blue water
              },
            ],
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [
              {
                color: '#616161', // Dark gray labels for points of interest
              },
            ],
          },
        ],
      });

      // Render markers for each listing
      renderMarkers();
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?AIzaSyAITiurxSWg3FQc4AXr3bzXqNlJNJ9o48s&libraries=places`;
      script.async = true;
      script.onload = loadMap;
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } else {
      loadMap();
    }
  }, [renderMarkers]);

  useEffect(() => {
    if (map.current) {
      renderMarkers();
    }
  }, [listings, cityFilter, renderMarkers]);

  return <div ref={mapRef} className={className} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}></div>;
};

export default Map;
