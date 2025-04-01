import { MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { Address, HoursStatus, Image } from "@yext/pages-components";
import { CardProps } from "@yext/search-ui-react";
import Cta from "../cta";
import { format_phone } from "../../utils/reusableFunctions";
import { VerticalConfig } from "../../config/VerticalConfig";
import { useEffect, useRef, useState } from "react";
import { useMapContext } from "../search/searchResults";
import { useSearchState } from "@yext/search-headless-react";
import ImageFormatter from "../ImageFormatter";
import CalendarComponent from "../CalendarComponent";
import ModalComponent from "../ModalComponent";

const ProfessionalLocation = ({ result }: CardProps<any>) => {
  const [pageType, setPageType] = useState("");
  const { name, distance, id, entityType } = result;
  const {
    headshot,
    mainPhone,
    hours,
    landingPageUrl,
    address,
    timezone,
    c_primaryCTA,
    c_secondaryCTA,
    slug,
  } = result.rawData;

  const getUnivConfig = useSearchState((state) => state.universal.verticals);
  let currVerticalKey = getUnivConfig?.find(
    (item) => item.results[0].entityType === entityType
  )?.verticalKey;

  let _type =
    (currVerticalKey &&
      VerticalConfig.find((item) => item.verticalKey === currVerticalKey)
        ?.pageType) ||
    "";

  const verticalKey = useSearchState((state) => state.vertical.verticalKey);
  const { hoveredId, setClickedId, setHoveredId } = [pageType, _type].includes(
    "map"
  )
    ? useMapContext()
    : {};

  const locationRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setPageType(
      VerticalConfig.find((item) => item.verticalKey === verticalKey)
        ?.pageType || ""
    );
  }, []);
  const handleMouseEnter = () => {
    if ([pageType, _type].includes("map") && setHoveredId && setClickedId) {
      setHoveredId(id!);
      setClickedId("");
    }
  };

  const handleMouseLeave = () => {
    if ([pageType, _type].includes("map") && setHoveredId && setClickedId) {
      setHoveredId("");
      setClickedId("");
    }
  };

  const handleClick = () => {
    if ([pageType, _type].includes("map") && setClickedId) {
      setClickedId(id!);
    }
  };

  return (
    <article
      id={`location-card-${id} `}
      ref={locationRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group border ${[pageType, _type].includes("map") && `flex flex-col md:flex-row gap-2`}  ${
        hoveredId === id ? "bg-gray-200" : ""
      }`}
    >
      <header className={`relative flex flex-col`}>
        <a
          href={`/${slug}`}
          className={` aspect-square block overflow-hidden  bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 `}
        >
          {headshot && (
            <ImageFormatter
              image={headshot!}
              className={`${[pageType, _type].includes("map") ? `!h-full w-full md:!w-56` : `!h-full !w-full`}`}
            />
          )}
        </a>
      </header>
      <section
        className={`my-auto px-4 space-y-1 ${[pageType, _type].includes("map") && `w-full md:w-3/4`} ${_type === "map" && `flex flex-col md:flex-row justify-between`}`}
      >
        <section
          className={`flex justify-start flex-col ${[pageType, _type].includes("map") ? `flex-row` : ` gap-2 mt-2`}`}
        >
          <h2 className=" flex justify-between text-lg font-bold">
            <a href={`/${slug}`}>{name}</a>
            {distance && (
              <span className="text-tertiary font-normal text-base italic mr-4 whitespace-nowrap">
                {(distance! / 1609.344).toFixed(2)} mi
              </span>
            )}
          </h2>
          {hours ? (
            <HoursStatus
              className="font-medium"
              timezone={timezone}
              hours={hours}
              dayOfWeekTemplate={() => <span className=""></span>}
            />
          ) : (
            <p>Fill in your hours</p>
          )}
          {address && (
            <address className="flex  justify-start font-medium leading-loose items-start   not-italic">
              <MapPinIcon className="h-4 w-4 mt-2 text-secondary" />
              <span className="ml-2">
                <Address
                  address={address}
                  lines={[
                    ["line1", "line2"],
                    ["city", ",", "region", "postalCode"],
                  ]}
                />{" "}
              </span>
            </address>
          )}
          {mainPhone && (
            <section className="flex justify-start font-medium leading-loose items-center  ">
              <PhoneIcon className="h-4 w-4 text-secondary" />
              <span className="ml-2">{format_phone(mainPhone)}</span>
            </section>
          )}
        </section>

        {pageType && (
          <footer
            className={`flex gap-2 justify-center  py-4 items-center uppercase ${
              ["map", "grid"].some((type) => pageType.includes(type))
                ? `flex-col md:flex-row !justify-start ${pageType === "map" && `py-4 md:py-0`}`
                : (!pageType || pageType === "universal") && _type === "map"
                  ? "flex-col"
                  : "flex-col md:flex-row"
            }`}
          >
            <Cta
              ctaType="primaryCta"
              cta={{ label: "Book appointment", linkType: "URL", link: "" }}
              hours={hours}
              name={name}
              isBookAnAppointment={true}
              otherStyles="p-2  md:text-base border-2 md:text-sm"
            />
            {c_secondaryCTA && (
              <Cta
                cta={c_secondaryCTA}
                ctaType="secondaryCta"
                otherStyles="p-2  md:text-base border-2 md:text-sm"
              />
            )}
          </footer>
        )}
      </section>
    </article>
  );
};

export default ProfessionalLocation;
