import {
  Address,
  AddressType,
  Coordinate,
  HoursStatus,
  Image,
  ImageType,
} from "@yext/pages-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ResponseComponent from "./ResponseComponent";
import Cta from "./cta";
import { Hours } from "@yext/types";
import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { getGoogleMapsLink, format_phone } from "../utils/reusableFunctions";

export interface CarouselData {
  c_shortDescriptionV1: string;
  c_shortDescriptionV2: string;
  c_image: FinsServicesImage;
  primaryPhoto: ImageType;
  fins_servicesImage: FinsServicesImage;
  c_serviceDescription: string;
  id: string;
  name: string;
  slug: string;
  address: AddressType;
  mainPhone: string;
  yextDisplayCoordinate: Coordinate;
  hours: Hours;
}

export interface FinsServicesImage {
  height: number;
  url: string;
  width: number;
}

interface CardsToShowProps {
  desktop: number;
  tablet: number;
  mobile: number;
}

interface CarouselProps {
  data: CarouselData[];
  cardsToShow: CardsToShowProps;
  autoScrollInterval?: number;
  title: string;
  isLocation?: boolean;
}

interface CarouselCardProps {
  currentItem: CarouselData;
  isLocationType: boolean;
}

const CarouselCard = ({
  currentItem,
  isLocationType,
}: CarouselCardProps): JSX.Element => {
  const {
    c_image,
    fins_servicesImage,
    name,
    primaryPhoto,
    c_serviceDescription,
    slug,
    hours,
    address,
    mainPhone,
    yextDisplayCoordinate,
    c_shortDescriptionV1,
    c_shortDescriptionV2,
  } = currentItem;

  const image = fins_servicesImage || c_image || primaryPhoto;

  return (
    <article
      className="bg-primary border flex flex-col md:ml-8 lg:pb-6 pb-4 md:pb-0 md:mx-2 mx-8"
      aria-label={isLocationType ? `Location: ${name}` : `Service: ${name}`}
    >
      {image && (
        <Image loading="lazy" image={image} className="!h-[250px] !w-full" />
      )}
      <section className="px-4 space-y-2 md:space-y-4 mt-4">
        <h3 className="text-secondary line-clamp-2 text-lg font-bold">
          {isLocationType ? (
            <a href={`/${slug}`} className="hover:underline">
              {name}
            </a>
          ) : (
            name
          )}
        </h3>

        {!isLocationType && (
          <ResponseComponent
            showMore={false}
            response={
              c_serviceDescription ||
              c_shortDescriptionV1 ||
              c_shortDescriptionV2
            }
          />
        )}

        {isLocationType ? (
          <div className="space-y-2">
            <HoursStatus hours={hours} />
            <address className="text-base not-italic space-y-2">
              <a
                href={getGoogleMapsLink(yextDisplayCoordinate)}
                className="flex gap-1 items-center hover:underline"
              >
                <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                <Address
                  address={address}
                  lines={[["line1", "city", ",", "region", "postalCode"]]}
                />
              </a>
              <a
                href={`tel:${mainPhone}`}
                className="flex gap-1 items-center hover:underline"
              >
                <PhoneIcon className="h-4 w-4" aria-hidden="true" />
                {format_phone(mainPhone)}
              </a>
            </address>
            <nav className="flex gap-2">
              <Cta
                cta={{
                  label: "Get Directions",
                  linkType: "URL",
                  link: getGoogleMapsLink(yextDisplayCoordinate),
                }}
                ctaType="primaryCta"
                otherStyles="text-sm"
              />
              <Cta
                cta={{
                  label: "View Store",
                  linkType: "URL",
                  link: `/${slug}`,
                }}
                ctaType="secondaryCta"
                otherStyles="text-sm"
              />
            </nav>
          </div>
        ) : (
          <Cta
            cta={{ label: "Learn more", linkType: "URL", link: `/${slug}` }}
            ctaType="primaryCta"
            otherStyles="mt-4"
          />
        )}
      </section>
    </article>
  );
};
// @ts-ignore
const SliderComponent = Slider.default || Slider;
const Carousel = ({
  cardsToShow: { desktop, tablet, mobile },
  data,
  autoScrollInterval = 3000,
  title,
  isLocation = false,
}: CarouselProps): JSX.Element => {
  const settings = {
    slidesToShow: Math.min(desktop, data.length),
    infinite: data.length > Math.min(desktop, data.length),
    dots: data.length > desktop,
    arrows: data.length > desktop,
    // autoplay: data.length > desktop,
    // autoplaySpeed: autoScrollInterval,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(tablet, data.length),
          dots: data.length > tablet,
          arrows: data.length > tablet,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(mobile, data.length),
          dots: data.length > mobile,
          arrows: data.length > mobile,
        },
      },
    ],
  };

  return (
    <section className="bg-primary-bg flex flex-col gap-4 lg:gap-8">
      <header>
        <h2
          className="text-2xl md:text-3xl font-medium mx-auto text-center text-secondary"
          role="heading"
          aria-level={2}
        >
          {title}
        </h2>
      </header>
      <article aria-label="services container">
        <SliderComponent {...settings}>
          {data.map((item, index) => (
            <CarouselCard
              currentItem={item}
              key={index}
              isLocationType={isLocation}
            />
          ))}
        </SliderComponent>
      </article>
    </section>
  );
};

export default Carousel;
