import { CardProps } from "@yext/search-ui-react";
import ResponseComponent from "../ResponseComponent";
import Cta from "../cta";
import { getGoogleMapsLink } from "../../utils/reusableFunctions";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { buildTimeRange } from "../relatedSections/threeGridLayout";
const EventStandard = ({ result }: CardProps<any>) => {
  const { name } = result;
  const {
    description,
    time,
    keywords,
    address,
    ticketUrl,
    websiteUrl,
    landingPageUrl,
    yextDisplayCoordinate,
  } = result.rawData;

  const formatDateTimeRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const startDateStr = startDate.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
      day: "2-digit",
    });
    const endDateStr = endDate.toLocaleDateString("default", {
      month: "long",
      year: "numeric",
      day: "2-digit",
    });

    const startTimeStr = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const endTimeStr = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (startDateStr === endDateStr) {
      return `${startDateStr} at ${startTimeStr} - ${endTimeStr}`;
    }

    return `${startDateStr} ${startTimeStr} - ${endDateStr} ${endTimeStr}`;
  };

  return (
    <article
      className="flex gap-2 md:gap-8 cards justify-start w-full items-start md:items-center flex-col md:flex-row"
      aria-labelledby={`job-title-${result.id}`}
    >
      <div className="flex-col justify-between items-center w-36 h-24 hidden md:flex bg-secondary text-primary">
        <div className="m-auto font-bold text-xl">
          {new Date(time.start).getDate()}
        </div>
        <div className="m-auto font-medium">
          {new Date(time.start).toLocaleString("default", { month: "long" })}
        </div>
      </div>
      <header className="flex flex-col">
        <h2 id={`job-title-${result.id}`} className="text-xl mb-2">
          {name}
        </h2>
        {time && <p className="text-tertiary">{buildTimeRange(time)}</p>}

        <address className="not-italic w-full flex gap-2 flex-col  my-2">
          {address && (
            <section className="flex gap-2 items-center text-base">
              <MapPinIcon className="h-4 w-4 text-secondary" />
              {address.line1}
            </section>
          )}
        </address>
        <span>
          {description ? (
            <ResponseComponent response={description} />
          ) : (
            <span className="hidden md:block md:invisible">
              Experts discuss digital payments, blockchain, and AI innovations
              shaping finance’s future at this global summit, driving new
              strategies and transformative growth across industries.
            </span>
          )}
        </span>
      </header>
      <footer
        className="flex flex-col items-center md:items-end justify-center gap-2 pt-4 pb-2 w-full md:w-1/3"
        aria-label="Call to Actions"
      >
        <Cta
          cta={{
            label: "RSVP",
            linkType: "URL",
            link: ticketUrl || websiteUrl?.url || landingPageUrl || "yext.com",
          }}
          ctaType="primaryCta"
          aria-label="Primary call to action"
          otherStyles="p-2 md:w-full md:text-base border-2 md:text-sm"
        />

        <Cta
          cta={{
            label: "Get Directions",
            link: getGoogleMapsLink(yextDisplayCoordinate!),
            linkType: "URL",
          }}
          ctaType="secondaryCta"
          aria-label="Secondary call to action"
          otherStyles="p-2 md:w-full md:text-base border-2 md:text-sm"
        />
      </footer>
    </article>
  );
};

export default EventStandard;
