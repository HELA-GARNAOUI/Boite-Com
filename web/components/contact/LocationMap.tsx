"use client"

import { useEffect, useRef } from "react"

export default function LocationMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This function will initialize the map when the component mounts
    const initializeMap = () => {
      if (mapRef.current && window.google) {
        // The coordinates for our office location
        const officeLocation = { lat: 40.712776, lng: -74.005974 } // Example: New York City

        // Create a new map instance
        const map = new window.google.maps.Map(mapRef.current, {
          center: officeLocation,
          zoom: 15,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }],
            },
            {
              featureType: "all",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }],
            },
            {
              featureType: "all",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#f5f5f5" }],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [{ color: "#bdbdbd" }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#e5e5e5" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }],
            },
            {
              featureType: "road.arterial",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#dadada" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }],
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }],
            },
            {
              featureType: "transit.line",
              elementType: "geometry",
              stylers: [{ color: "#e5e5e5" }],
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#c9c9c9" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }],
            },
          ],
        })

        // Add a marker for our office location
        const marker = new window.google.maps.Marker({
          position: officeLocation,
          map: map,
          title: "DigiFlow Office",
          animation: window.google.maps.Animation.DROP,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#4f46e5",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          },
        })

        // Add an info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; max-width: 200px;">
              <h3 style="margin: 0 0 8px; font-weight: bold; color: #4f46e5;">DigiFlow</h3>
              <p style="margin: 0; font-size: 14px;">123 Digital Street<br>Tech City, 10001</p>
            </div>
          `,
        })

        // Open info window when marker is clicked
        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })

        // Open info window by default
        infoWindow.open(map, marker)
      }
    }

    // Load Google Maps API if it's not already loaded
    if (!window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeMap
      document.head.appendChild(script)

      return () => {
        // Clean up script if component unmounts before script loads
        document.head.removeChild(script)
      }
    } else {
      initializeMap()
    }
  }, [])

  return (
    <div ref={mapRef} className="w-full h-full bg-gray-100 dark:bg-gray-800 relative">
      {/* Fallback content while map loads */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading map...</div>
      </div>
    </div>
  )
}
