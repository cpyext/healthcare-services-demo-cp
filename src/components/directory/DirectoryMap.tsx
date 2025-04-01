import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { DirectoryChild } from "../../types/directory";
import { Marker } from "@yext/pages-components";
import { createRoot } from "react-dom/client";
import { MapPinIcon } from "@heroicons/react/24/outline";

interface currCoordProps {
  id: string;
  yextDisplayCoordinate: { latitude: number; longitude: number };
  name: string;
  slug: string;
}

interface DirectoryMapProp {
  results: DirectoryChild[];
  showPins: boolean;
}

const DirectoryMap = ({ results, showPins }: DirectoryMapProp) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [currCords, setCurrCords] = useState<currCoordProps[]>([]);

  useEffect(() => {
    const coordinates = extractCoordinates(results);
    setCurrCords(coordinates);
  }, [results]);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapboxgl.accessToken = import.meta.env.YEXT_PUBLIC_MAP_API_KEY;
      mapInstance.current = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.006, 40.7128],
        zoom: 4,
        scrollZoom: false,
        doubleClickZoom: false,
      });
    }

    return () => {
      mapInstance.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (currCords.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();

        currCords.forEach((cord) => {
          const { latitude, longitude } = cord.yextDisplayCoordinate;

          bounds.extend([longitude, latitude]);

          const markerEl = document.createElement("article");

          const root = createRoot(markerEl);
          root.render(<MapPinPin />);
          markerEl.addEventListener("click", () => {
            if (mapInstance.current) {
              mapInstance.current.flyTo({
                center: [longitude, latitude],
                zoom: 6,
                speed: 1.2,
                curve: 1.42,
              });
            }
          });

          if (showPins) {
            const marker = new mapboxgl.Marker(markerEl)
              .setLngLat([longitude, latitude])
              .addTo(mapInstance.current as mapboxgl.Map);
            markersRef.current.push(marker);
          }
        });

        if (!bounds.isEmpty()) {
          mapInstance.current.fitBounds(bounds, {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
            maxZoom: showPins ? 15 : 10,
          });
        }
      }
    }
  }, [currCords, showPins]);

  const extractCoordinates = (nodes: DirectoryChild[]): currCoordProps[] => {
    const coordinates: currCoordProps[] = [];
    nodes.forEach((node, index) => {
      if (node.yextDisplayCoordinate) {
        const { latitude, longitude } = node.yextDisplayCoordinate;
        coordinates.push({
          id: (index + 1).toString(),
          yextDisplayCoordinate: { latitude, longitude },
          name: node.name,
          slug: node.slug,
        });
      }
      if (node.dm_directoryChildren) {
        coordinates.push(...extractCoordinates(node.dm_directoryChildren));
      }
    });
    return coordinates;
  };

  return <div ref={mapRef} className="h-[950px] w-full" aria-label="Map" />;
};

export default DirectoryMap;

export const MapPin = ({ result, index = 0 }: any) => {
  const location = result;
  const { id, yextDisplayCoordinate } = location;

  return (
    <Marker coordinate={yextDisplayCoordinate} id={id}>
      <MapPinPin />
    </Marker>
  );
};
const MapPinPin = () => {
  return <MapPinIcon />;
};
