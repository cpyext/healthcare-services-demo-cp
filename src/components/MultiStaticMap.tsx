interface Coordinate {
  address: {
    city: string;
    countryCode: string;
    line1: string;
    line2?: string;
    postalCode: string;
    region: string;
  };
  mainPhone: string;
  name: string;
  slug: string;
  yextDisplayCoordinate: {
    latitude: number;
    longitude: number;
  };
}

interface MapProps {
  coordinates: Coordinate[];
  apiKey: string;
}

export const generateStaticMapUrl = (
  coordinates: Coordinate[],
  apiKey: string
): string => {
  const baseURL = "https://maps.googleapis.com/maps/api/staticmap";
  const mapSize = "600x400"; // Customize map size
  const zoom = 12; // Adjust zoom level
  const markers = coordinates
    .map(
      (coord) =>
        `markers=color:red%7Clabel:${coord.name.charAt(0)}%7C${coord.yextDisplayCoordinate.latitude},${coord.yextDisplayCoordinate.longitude}`
    )
    .join("&");

  return `${baseURL}?size=${mapSize}&zoom=${zoom}&${markers}&key=${apiKey}`;
};
