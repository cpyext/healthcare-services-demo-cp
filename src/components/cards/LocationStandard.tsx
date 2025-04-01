import { CardComponent, CardProps } from "@yext/search-ui-react";
import { useMapContext } from "../search/searchResults";
import Location from "../../types/locations";
import { Address, AddressType, HoursStatus } from "@yext/pages-components";
import Cta from "../cta";
import { format_phone, getGoogleMapsLink } from "../../utils/reusableFunctions";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import { GrAtm } from "react-icons/gr";
import { BsBank } from "react-icons/bs";

const LocationStandard: CardComponent<any> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const {
    id,
    slug,
    name,
    address,
    timezone,
    hours,
    mainPhone,
    yextDisplayCoordinate,
  } = result.rawData;
  const { index, distance, entityType } = result;

  const { hoveredId, setClickedId, setHoveredId } = useMapContext();

  const locationRef = useRef<HTMLDivElement | null>(null);

  return (
    <article
      id={`location-card-${id}`}
      ref={locationRef}
      onClick={() => setClickedId(id)}
      className={`flex flex-col justify-between border-y p-4 cards  ${
        hoveredId === id ? "bg-accent" : ""
      }`}
      onMouseEnter={() => (setHoveredId(id), setClickedId(""))}
      onMouseLeave={() => (setHoveredId(""), setClickedId(""))}
      aria-labelledby={`location-${id}`}
    >
      <section className="flex flex-col">
        <header className="flex justify-between">
          <a
            id={`location-${id}`}
            target="_blank"
            href={entityType === "atm" ? `#` : slug}
            className={`font-semibold flex items-center space-x-2 text-xl  mb-2 ${entityType === "atm" && `cursor-none pointer-events-none`}`}
            rel="noreferrer"
          >
            <span
              className="bg-secondary text-primary text-center w-6 h-6 rounded-full flex justify-center text-sm items-center"
              aria-label={`Location number ${index}`}
            >
              {index}
            </span>
            {entityType === "atm" ? <GrAtm /> : <BsBank />}
            <h2 className="text-lg">
              {name} {entityType === "atm" && ` - ATM`}
            </h2>
          </a>
          {distance && (
            <span className="  italic whitespace-nowrap text-tertiary">
              {(distance! / 1609.344).toFixed(2)} mi
            </span>
          )}
        </header>
      </section>

      {hours && <HoursStatus hours={hours} timezone={timezone} />}

      <section className="flex flex-col md:flex-row  justify-between items-center ">
        <address className="not-italic w-full flex gap-2 flex-col mt-4">
          {address && (
            <section className="flex gap-2 items-base">
              <MapPinIcon className="h-4 w-4  mt-1" />
              <span className="ml-2">
                <Address
                  address={address as AddressType}
                  lines={[
                    ["line1", ",", "line2"],
                    ["city", ",", "region", "postalCode"],
                  ]}
                />{" "}
              </span>
            </section>
          )}
          <section className="flex gap-2 items-center">
            <PhoneIcon className="h-4 w-4" />
            <a href={`tel:${mainPhone}`} role="button" className="font-medium">
              {format_phone(mainPhone)}
            </a>
          </section>
        </address>

        {(yextDisplayCoordinate || mainPhone) && (
          <footer
            className="flex flex-col items-center md:items-end justify-center gap-2 pt-4 pb-2 w-full"
            aria-label="Call to Actions"
          >
            {mainPhone && (
              <Cta
                otherStyles="p-2 md:w-full md:text-base border-2"
                cta={{
                  label: "Call",
                  link: `tel:${mainPhone}`,
                  linkType: "URL",
                }}
                ctaType="primaryCta"
                aria-label="Primary call to action"
              />
            )}
            {yextDisplayCoordinate && (
              <Cta
                otherStyles="p-2 md:w-full md:text-base border-2"
                cta={{
                  label: "Get Directions",
                  link: getGoogleMapsLink(yextDisplayCoordinate),
                  linkType: "URL",
                }}
                ctaType="secondaryCta"
                aria-label="Secondary call to action"
              />
            )}
          </footer>
        )}
      </section>
    </article>
  );
};

export default LocationStandard;
