import { Image } from "@yext/pages-components";

interface Coordinates {
  latitude: string;
  longitude: string;
}

const StaticMap = (props: Coordinates) => {
  const { latitude, longitude } = props;
  const buildUrl =
    "https://maps.googleapis.com/maps/api/staticmap?center=" +
    `${latitude}` +
    "," +
    `${longitude}` +
    "&zoom=14&size=600x400&maptype=roadmap&markers=color:red%7Clabel:LL%7C" +
    `${latitude}` +
    "," +
    `${longitude}` +
    `&key=${import.meta.env.YEXT_PUBLIC_STATIC_MAP_KEY}`;
  const imageUrl = {
    alternateText: "Static map",
    height: 360,
    width: 640,
    url: buildUrl,
  };
  return (
    <Image
      image={imageUrl}
      className="!max-w-none !w-full md:!w-[45%]"
      loading="lazy"
    />
  );
};

export default StaticMap;
