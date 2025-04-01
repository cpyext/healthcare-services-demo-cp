import {
  Address,
  AddressType,
  HoursStatus,
  Image,
  PhotoGallery,
} from "@yext/pages-components";
import ResponseComponent from "../ResponseComponent";
import { ComplexImage, Coordinate, Hours } from "@yext/types";
import { Time } from "../../types/events";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { format_phone, getGoogleMapsLink } from "../../utils/reusableFunctions";
import Cta from "../cta";

interface relatedProductProps {
  c_shortDescriptionV2: {
    json: any;
  };
  id: string;
  name: string;
  primaryPhoto?: ComplexImage;
  photoGallery?: PhotoGallery;
  slug: string;
  description: string;
  time: Time;
  hours?: Hours;
  address?: AddressType;
  mainPhone?: string;
  yextDisplayCoordinate?: Coordinate;
  ticketUrl?: any;
  websiteUrl?: any;
  landingPageUrl?: any;
  meta?: { entityType?: { id: string } };
}

interface relatedProductsProps {
  relatedItems: relatedProductProps[];
  title: string;
  titleAlignment?: "center" | "left";
  ctaCount?: number;
  type?: string;
}

const ThreeGridLayout = ({
  relatedItems,
  title,
  titleAlignment = "left",
  ctaCount = 2,
  type = "location",
}: relatedProductsProps) => {
  return (
    <section className="centered-container">
      <h2
        className={`text-2xl md:text-4xl font-bold text-center ${titleAlignment === "center" && "md:text-center"}`}
      >
        {title}
      </h2>
      <article className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {relatedItems.slice(0, 3).map((item, index) => (
          <section
            className="flex flex-col justify-between bg-primary border"
            key={index}
          >
{(item.primaryPhoto || item.photoGallery?.[0]) && (
  <Image
    image={item.primaryPhoto || item.photoGallery?.[0] as ComplexImage}
    className="w-full max-w-none !"
  />
)}

            <article className="p-8 flex flex-col w-full gap-8">
              <article className="flex flex-col w-full gap-3 md:gap-4">
                <h3 className="text-xl md:text-2xl font-bold">
                  <a href={`/${item.slug}`}>{item.name}</a>
                </h3>
                {item.time && <p>{buildTimeRange(item.time)}</p>}
                {item.hours && <HoursStatus hours={item.hours} />}
                {(item.c_shortDescriptionV2 || item.description) && (
                  <ResponseComponent
                    response={item.c_shortDescriptionV2 || item.description}
                  />
                )}
                {item.address && (
                  <span className="flex gap-2">
                    <MapPinIcon
                      className="h-5 w-5 text-secondary"
                      aria-hidden="true"
                    />
                    <Address
                      address={item.address as AddressType}
                      lines={[["line1", "city", ",", "region", "postalCode"]]}
                    />
                  </span>
                )}
                {item.mainPhone && (
                  <span className="flex gap-2 items-center">
                    <PhoneIcon
                      className="h-5 w-5 text-secondary"
                      aria-hidden="true"
                    />
                    {format_phone(item.mainPhone)}
                  </span>
                )}
              </article>
              <nav className="flex flex-col md:flex-row gap-4">
                {ctaCount >= 2 ? (
                  type === "location" ? (
                    <nav className="flex gap-2">
{item.yextDisplayCoordinate && (
  <Cta
    otherStyles="md:w-36"
    cta={{
      label: "Get Directions",
      link: getGoogleMapsLink(item.yextDisplayCoordinate),
      linkType: "URL",
    }}
    ctaType="secondaryCta"
    aria-label="Secondary call to action"
  />
)}
                      {item?.meta?.entityType?.id !== "atm" && (
                        <Cta
                          cta={{
                            label: "View Branch",
                            linkType: "URL",
                            link: `/${item.slug}`,
                          }}
                          ctaType="secondaryCta"
                        />
                      )}
                    </nav>
                  ) : (
                    <nav className="flex gap-2">
                      <Cta
                        otherStyles="md:w-36"
                        cta={{
                          label: "RSVP",
                          linkType: "URL",
                          link:
                            item.ticketUrl ||
                            item.websiteUrl?.url ||
                            item.landingPageUrl ||
                            "yext.com",
                        }}
                        ctaType="primaryCta"
                        aria-label="Primary call to action"
                      />

                      <Cta
                        otherStyles="md:w-36"
                        cta={{
                          label: "Get Directions",
                          link: getGoogleMapsLink(item.yextDisplayCoordinate!),
                          linkType: "URL",
                        }}
                        ctaType="secondaryCta"
                        aria-label="Secondary call to action"
                      />
                    </nav>
                  )
                ) : (
                  <nav className="flex gap-2 items-center justify-center">
                    <Cta
                      cta={{
                        label: "Learn more",
                        linkType: "URL",
                        link: item.slug,
                      }}
                      ctaType="primaryCta"
                      otherStyles="px-8 py-2"
                    />
                  </nav>
                )}
              </nav>
            </article>
          </section>
        ))}
      </article>
    </section>
  );
};

export default ThreeGridLayout;

export const buildTimeRange = (time: Time) => {
  const sDate = new Date(time.start);
  const eDate = new Date(time.end);
  const startDate = `${(sDate.getMonth() + 1).toString().padStart(2, "0")}.${sDate.getDate().toString().padStart(2, "0")}.${sDate.getFullYear()}`;
  const endDate = `${(eDate.getMonth() + 1).toString().padStart(2, "0")}.${eDate.getDate().toString().padStart(2, "0")}.${eDate.getFullYear()}`;
  return (
    <>
      {startDate === endDate
        ? `${startDate} | ${buildTime(sDate)} - ${buildTime(eDate)}`
        : `${startDate} ${buildTime(sDate)} - ${endDate} ${buildTime(eDate)}`}
    </>
  );
};

const buildTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${period}`;
};
