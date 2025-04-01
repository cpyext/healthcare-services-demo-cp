import { MapPinIcon, PhoneIcon } from "@heroicons/react/20/solid";
import {
  Address,
  AddressType,
  HoursStatus,
  Image,
} from "@yext/pages-components";
import { CardProps } from "@yext/search-ui-react";
import Cta from "../cta";
import { format_phone } from "../../utils/reusableFunctions";
import ResponseComponent from "../ResponseComponent";

const ProfessionalStandard = ({ result }: CardProps<any>) => {
  const { name, index, distance } = result;
  const {
    id,
    description,
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

  return (
    <article className="text-tertiary border rounded-lg flex justify-between  pr-4">
      <header className="relative flex flex-col w-1/6">
        <a
          href={landingPageUrl}
          className=" group aspect-square block   overflow-hidden rounded-t-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
        >
          {headshot && (
            <Image
              image={headshot!}
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
          )}
        </a>
      </header>
      <section className="px-2 space-y-1 ml-4 flex-1 mt-4">
        <header className="flex justify-between text-secondary">
          <a
            id={`location-${id}`}
            target="_blank"
            href={slug}
            className="font-semibold text-orange flex items-center space-x-2 text-xl mb-2"
            rel="noreferrer"
          >
            <span
              className="bg-black text-primary text-center w-6 h-6 rounded-full flex items-center justify-center text-sm"
              aria-label={`Location number ${index}`}
            >
              {index}
            </span>
            <h2 className="text-lg">{name}</h2>
          </a>
          <span className="text-tertiary italic">
            {(distance! / 1609.344).toFixed(2)} mi
          </span>
        </header>

        {hours ? (
          <HoursStatus timezone={timezone} hours={hours} />
        ) : (
          <p>Fill in your hours</p>
        )}
        <section className="flex justify-between  gap-8">
          <div>
            <div className="flex md:justify-between">
              <div>
                {address && (
                  <address className="flex  justify-start font-medium leading-loose items-start   text-secondary not-italic">
                    <MapPinIcon className="h-4 w-4 mt-2" />
                    <span className="ml-2">
                      <Address address={address as AddressType} />
                    </span>
                  </address>
                )}
                {mainPhone && (
                  <section className="flex  justify-start font-medium leading-loose items-center   text-secondary">
                    <PhoneIcon className="h-4 w-4" />
                    <span className="ml-2">{format_phone(mainPhone)}</span>
                  </section>
                )}
              </div>
              {(c_primaryCTA || c_secondaryCTA) && (
                <footer className="flex flex-col   gap-2 justify-center pt-4 pb-2 items-center my-auto">
                  {c_primaryCTA && (
                    <Cta cta={c_primaryCTA} ctaType="primaryCta" />
                  )}
                  {c_secondaryCTA && (
                    <Cta cta={c_secondaryCTA} ctaType="secondaryCta" />
                  )}
                </footer>
              )}
            </div>
            <ResponseComponent response={description} showMore={true} />
          </div>
        </section>
      </section>
    </article>
  );
};

export default ProfessionalStandard;
