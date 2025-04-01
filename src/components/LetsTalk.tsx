import { format_phone } from "../utils/reusableFunctions";
import Cta from "./cta";
import StaticMap from "./StaticMap";
import { PhoneIcon } from "@heroicons/react/20/solid";
import { IoMailOpen } from "react-icons/io5";
import { CTA } from "@yext/pages-components";
export interface Coordinate {
  latitude: string;
  longitude: string;
}
interface LetsTalkProps {
  description: string;
  phone: string;
  email: string;
  geoCodedCoordinate: Coordinate;
  cta?: CTA;
}
const LetsTalk = ({
  description,
  phone,
  email,
  geoCodedCoordinate,
  cta,
}: LetsTalkProps) => {
  return (
    <section className="centered-container flex flex-col md:justify-center  w-full mx-auto items-center">
      <h2 className="sr-only">Let's Talk</h2>
      <article className=" md:py-0 flex flex-col gap-4 md:gap-8">
        <h2 className="text-secondary text-2xl md:text-4xl font-bold mx-auto text-center">
          Let's Talk
        </h2>
        <article className="w-full flex flex-col-reverse md:flex-row gap-4 md:gap-8 text-tertiary">
          <section className=" flex flex-col gap-2 md:gap-8 my-auto">
            <p className="text-left">
              {!description || description.length <= 60
                ? `Welcome to Capital Bank, where your financial goals become our mission. At Capital Bank, we offer a comprehensive range of services to meet your banking needs. From retail banking solutions designed for your everyday transactions to mortgage and lending services to help you achieve your dream home, we've got you covered. Our dedicated team of experts specializes in wealth management, ensuring your financial future is secure and prosperous. For businesses, our business banking services provide tailored solutions to fuel your growth and success. At Capital Bank, we are committed to delivering excellence in banking, putting you on the path to financial success.`
                : description}
            </p>
            <address className="text-secondary my-4 md:my-0 flex flex-col md:flex-row gap-4 items-center">
              <a href={`tel:${phone}`} className="flex gap-1 items-center">
                <PhoneIcon className="h-4 w-4" />
                {format_phone(phone)}
              </a>
              <span className="hidden md:block"> | </span>
              <a href={`mailto:${email}`} className="flex gap-1 items-center">
                <IoMailOpen className="h-4 w-4" /> {email}
              </a>
            </address>
            {cta && <Cta cta={cta} ctaType="primaryCta" />}
          </section>
          <StaticMap
            latitude={geoCodedCoordinate.latitude}
            longitude={geoCodedCoordinate.longitude}
          />
        </article>
      </article>
    </section>
  );
};

export default LetsTalk;
