import { MapboxMaps, Map, Marker } from "@yext/pages-components";
const LocationBannerMap = ({ apiKey, yextDisplayCoordinate, id }: any) => {
  return (
    <Map
      apiKey={apiKey}
      provider={MapboxMaps}
      bounds={[
        {
          latitude: yextDisplayCoordinate.latitude,
          longitude: yextDisplayCoordinate.longitude,
        },
      ]}
      className="h-64 w-full transition-all delay-300 my-4"
      providerOptions={{
        maxZoom: 6,
        scrollZoom: false,
        boxZoom: false,
        doubleClickZoom: false,
        zoomControl: false,
        showZoom: false,
      }}
    >
      <Marker coordinate={yextDisplayCoordinate} id={id}>
        <svg
          className={`h-10 w-10`}
          fill="none"
          viewBox="0 0 384 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-secondary"
            d="M172.3 501.7C27 291 0 269.4 0 192 0 86 86 0 192 0s192 86 192 192c0 77.4-27 99-172.3 309.7-9.5 13.8-29.9 13.8-39.5 0z"
            stroke="#000"
            strokeOpacity=".5"
          />
          <text
            className="text-primary"
            x="50%"
            y="40%"
            fontSize="150px"
            fontWeight="bold"
            textAnchor="middle"
            fill={"#FFFFFF"}
          ></text>
        </svg>
      </Marker>
    </Map>
  );
};

export default LocationBannerMap;
