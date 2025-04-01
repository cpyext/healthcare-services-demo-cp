import Location from "../types/locations";
import { useCallback, useEffect } from "react";
import { Result } from "@yext/search-headless-react";
import { CoordinateClass, Marker, useMapContext } from "@yext/pages-components";
import { IoClose } from "react-icons/io5";

const getLocationHTML = (location: Location) => {
  const address = location.address;
  return (
    <div className="popover" aria-label="pop over">
      <p className="font-bold">{location.name || "unknown location"}</p>
      <p>{location.address.line1}</p>
      <p>{`${address.city}, ${address.region}, ${address.postalCode}`}</p>
    </div>
  );
};

export interface MapPinProps {
  type: "verticalResults" | "universalResults";
  result: Result<any>;
  clickedId: string;
  hoveredId: string;
  setHoveredId: (value: string) => void;
  setClickedId: (value: string) => void;
}

const scrollToCard = (locationId: string) => {
  const locationCard = document.getElementById(`location-card-${locationId}`);
  if (locationCard) {
    locationCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
};

const MapPin = ({
  result,
  hoveredId,
  setHoveredId,
  clickedId,
  setClickedId,
  type,
}: MapPinProps) => {
  const location = result.rawData;
  const { index } = result;
  const map = useMapContext();
  const { id, yextDisplayCoordinate } = location;

  const handleClick = useCallback(() => {
    if (type === "verticalResults") {
      setClickedId(id);
      scrollToCard(id);
    }
  }, [id, type]);

  useEffect(() => {
    if (clickedId === id && yextDisplayCoordinate) {
      const mapBounds = map.getBounds();
      const coordClass = new CoordinateClass(yextDisplayCoordinate);
      if (!mapBounds.contains(coordClass)) {
        map.setCenter(yextDisplayCoordinate, true);
      }
    }
  }, [clickedId, id, yextDisplayCoordinate, map]);

  const updateHoveredLocation = useCallback(() => {
    setHoveredId(id);
  }, [id, setHoveredId]);

  const removeHoveredLocation = useCallback(() => {
    setHoveredId("");
  }, [setHoveredId]);

  return (
    <Marker
      onClick={handleClick}
      coordinate={yextDisplayCoordinate}
      id={id}
      onHover={type === "verticalResults" ? updateHoveredLocation : undefined}
      onFocus={type === "verticalResults" ? removeHoveredLocation : undefined}
      zIndex={type === "verticalResults" && hoveredId === id ? 2 : 0}
    >
      <div
        className={`border bg-primary p-1  ${clickedId !== "" && clickedId === id ? `flex` : `hidden`}`}
      >
        {getLocationHTML(location)}{" "}
        <IoClose
          className="h-4 w-4"
          onClick={(e) => {
            e.stopPropagation();
            setClickedId("");
          }}
        />
      </div>

      <MapPinPin
        height={hoveredId === id ? "h-10" : "h-8"}
        width={hoveredId === id ? "w-10" : "w-8"}
        index={index!}
      />
    </Marker>
  );
};
export default MapPin;

interface MapPinPropsN {
  height: string;
  index: number;
  textColor?: string;
  width: string;
}

const MapPinPin = (props: MapPinPropsN) => {
  const { height, index, textColor, width } = props;
  return (
    <svg
      className={`${height} ${width}`}
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
        fill={textColor || "#FFFFFF"}
      >
        {index}
      </text>
    </svg>
  );
};
