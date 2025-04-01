/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static HTML page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/pageLayout";
import {
  Address,
  HoursStatus,
  Image,
  HoursTable,
  getDirections,
  Map,
  MapboxMaps,
  Marker,
} from "@yext/pages-components";
import { format_phone, getRandomObjects } from "../utils/reusableFunctions";
import { useEffect, useState } from "react";
import ScrollToTop from "../components/scrollToTop";
import { IoWarningOutline } from "react-icons/io5";
import BreadCrumbs from "../components/breadCrumbs";
import StarRating from "../components/starRating";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import ReviewsComponent from "../components/ReviewsComponent";
import Testimonials from "../components/testimonials";
import Faqs from "../components/relatedSections/Faqs";
import Team from "../components/relatedSections/Team";
import Blogs from "../components/relatedSections/Blogs";
import RelatedProducts from "../components/relatedSections/threeGridLayout";
import ThreeGridLayout from "../components/relatedSections/threeGridLayout";
import AnnouncementBanner from "../components/AnnouncementComponent/Announcement";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-location",
    fields: [
      "id",
      "uid",
      "slug",
      "name",
      "hours",
      "c_backgroundImage",
      "address",
      "mainPhone",
      "c_primaryCTA",
      "c_relatedProfessionals.id",
      "c_relatedProfessionals.name",
      "c_relatedProfessionals.mainPhone",
      "c_relatedProfessionals.emails",
      "c_relatedProfessionals.headshot",
      "c_relatedProfessionals.slug",
      "c_relatedProfessionals.c_relatedBlogs.id",
      "c_relatedProfessionals.c_relatedBlogs.name",
      "c_relatedProfessionals.c_relatedBlogs.primaryPhoto",
      "c_relatedProfessionals.c_relatedBlogs.emails",
      "c_relatedProfessionals.c_relatedBlogs.bodyV2",
      "c_relatedProfessionals.c_relatedBlogs.slug",
      "c_relatedProfessionals.c_relatedBlogs.datePosted",
      "c_relatedBlogs.name",
      "c_relatedBlogs.bodyV2",
      "c_relatedBlogs.shortDescriptionV2",
      "c_relatedBlogs.primaryPhoto",
      "c_relatedBlogs.c_author",
      "c_relatedBlogs.datePosted",
      "c_relatedBlogs.slug",
      "description",
      "emails",
      "yextDisplayCoordinate",
      "specialities",
      "frequentlyAskedQuestions",
      "services",
      "languages",
      "dm_directoryParents_hc_hf_directory.name",
      "dm_directoryParents_hc_hf_directory.slug",
      "dm_directoryParents_hc_hf_directory.id",
      "dm_directoryParents_hc_hf_directory.c_addressRegionAbbreviation",
      "photoGallery",
      "timezone",
      "c_relatedProducts.id",
      "c_relatedProducts.c_shortDescriptionV2",
      "c_relatedProducts.primaryPhoto",
      "c_relatedProducts.slug",
      "c_relatedProducts.name",
      "c_relatedPromo.id",
      "c_relatedPromo.name",
      "c_relatedPromo.c_backgroundImage",
      "c_relatedPromo.description",
      "c_relatedEvents.id",
      "c_relatedEvents.name",
      "c_relatedEvents.time",
      "c_relatedEvents.photoGallery",
      "c_relatedEvents.description",
      "c_relatedLocations.name",
      "c_relatedLocations.slug",
      "c_relatedLocations.address",
      "c_relatedLocations.mainPhone",
      "c_relatedLocations.hours",
      "c_relatedLocations.yextDisplayCoordinate",
      "c_relatedLocations.meta",
      "closed",
    ],
    filter: {
      entityTypes: ["healthcareFacility"],
      savedFilterIds: ["1401364440"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template component. The props passed in here are the direct stream document defined by `config`.
 */
const Location: Template<TemplateRenderProps> = ({ document }) => {
  const {
    name,
    address,
    mainPhone,
    description,
    c_relatedProfessionals,
    emails,
    _site,
    yextDisplayCoordinate,
    frequentlyAskedQuestions,
    hours,
    services,
    __meta,
    photoGallery,
    dm_directoryParents_hc_hf_directory,
    timezone,
    c_relatedProducts,
    c_relatedPromo,
    c_relatedEvents,
    c_relatedBlogs,
    c_relatedLocations,
    closed,
  } = document;

  const professionalLocations = [
    {
      address: address,
      hours: hours,
      mainPhone: mainPhone,
      name: address.city,
      yextDisplayCoordinate: yextDisplayCoordinate,
      slug: "#",
    },
    ...(Array.isArray(c_relatedLocations)
      ? c_relatedLocations
      : [c_relatedLocations]),
  ];

  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const email =
    (emails && emails.length >= 1 && emails[0]) || `contact@contact.com`;
  useEffect(() => {
    if (c_relatedProfessionals?.length) {
      const relatedBlogs = c_relatedProfessionals.flatMap(
        (item: any) => item.c_relatedBlogs || []
      );
      setRelatedBlogs(getRandomObjects(relatedBlogs));
    }
  }, [c_relatedProfessionals]);

  return (
    <PageLayout _site={_site} templateData={{ __meta, document }}>
      {/* Closed Banner */}
      {closed && (
        <section className="w-full bg-tertiary">
          <article className="centered-container !py-0">
            <p className="flex text-base  items-center  h-20 md:h-14 my-auto text-white">
              <IoWarningOutline className="h-6 w-6 md:h-4 md:w-4 mr-4" />
              This location is temporarily closed due to inclement weather.
            </p>
          </article>
        </section>
      )}
      <AnnouncementBanner isVisibleByDefault={true} position="left"/>
      <article className="centered-container !py-4 hidden md:block">
        <BreadCrumbs
          data={dm_directoryParents_hc_hf_directory}
          currAddress={address.line1}
        />
      </article>
      {/* Hero Section */}
      <section className="centered-container flex flex-col md:h-[400px] md:flex-row md:justify-between gap-4 md:gap-0">
        <article className="flex flex-col w-full md:w-1/2 gap-3 md:gap-4">
          <p className="text-xl md:text-2xl font-bold">{name}</p>
          <h1 className="text-2xl md:text-5xl font-bold">{address.line1}</h1>
          <HoursStatus
            currentTemplate={(params: any) => (
              <span className="HoursStatus-current--search">
                {params.isOpen ? (
                  <span className="font-bold">Open Now</span>
                ) : (
                  <span className="font-bold">Closed</span>
                )}
              </span>
            )}
            hours={hours}
            className="text-lg"
            timezone={timezone}
            dayOfWeekTemplate={() => null}
          />
          <span className="flex items-center gap-2">
            <p className="font-bold">4.5</p>
            <span className="gap-0.5 flex">
              <StarRating selectedStars={4.5} />
            </span>
            <span className="font-normal">(21 reviews)</span>
          </span>
          <nav className="flex flex-col md:flex-row gap-4">
            <button className="font-bold md:text-lg bg-secondary text-primary w-full md:w-fit p-2  md:px-4 flex items-center justify-center border rounded-full">
              Get Directions
            </button>
            <button className="border-2 font-bold text-secondary border-secondary md:text-lg w-full md:w-fit p-2  md:px-4 flex items-center justify-center rounded-full">
              Call us
            </button>
          </nav>
        </article>
        <Image image={photoGallery[0]} className="w-full md:!w-1/2 max-w-none" />


      </section>
      {/* NAP Section */}
      <section className="bg-accent">
        <section className="centered-container  ">
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
            <article className="flex flex-col gap-4">
              <h2 className="text-2xl  font-bold">Information</h2>
              <Address
                address={address}
                lines={[["line1"], ["city", "region", "postalCode"]]}
              />
              <a
                className="text-secondary text-base font-bold decoration-2 underline-offset-4  underline"
                href={getDirections(address)}
              >
                Get Directions
              </a>
              <span className="flex gap-2 items-center">
                <HiOutlinePhone className="h-4 w-4 text-secondary" />
                <p>{format_phone(mainPhone)}</p>
              </span>

              <span className="flex gap-2 items-centerdecoration-2 underline-offset-4  underline text-secondary font-bold">
                <HiOutlineMail className="h-4 w-4" /> <p>{email}</p>
              </span>
            </article>
            <article className="flex flex-col gap-4">
              <h2 className="text-2xl  font-bold">Hours</h2>
              <HoursTable hours={hours} />
            </article>
            <article className="flex flex-col gap-4">
              <h2 className="text-2xl  font-bold">Services</h2>
              <ul className="list-disc pl-4 marker:text-secondary space-y-2">
                {services.map((item: string, i: any) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </article>
          </section>
          <section className="hidden md:block">
            <Map
              bounds={[yextDisplayCoordinate]}
              providerOptions={{
                scrollZoom: false,
                boxZoom: false,
                doubleClickZoom: false,
                zoomControl: false,
                showZoom: false,
                style: "mapbox://styles/mapbox/light-v11",
              }}
              className="h-72 w-full border-2"
              provider={MapboxMaps}
              apiKey={import.meta.env.YEXT_PUBLIC_MAP_API_KEY}
            >
              <Marker coordinate={yextDisplayCoordinate} id={""}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  className="w-12 h-12 fill-accent"
                >
                  <g transform="translate(1.4 1.4) scale(2.81 2.81)">
                    <path
                      d="M 45 90 c -0.354 0 -0.681 -0.187 -0.861 -0.491 l -4.712 -7.972 C 30.222 65.976 20.704 49.884 17.64 43.734 c -2.033 -4.169 -3.062 -8.646 -3.062 -13.313 C 14.578 13.647 28.225 0 45 0 c 16.774 0 30.422 13.647 30.422 30.422 c 0 4.664 -1.028 9.141 -3.056 13.305 c -0.012 0.023 -0.023 0.045 -0.036 0.067 c -3.095 6.193 -12.581 22.231 -21.757 37.743 l -4.712 7.972 C 45.681 89.813 45.354 90 45 90 z"
                      className="fill-secondary"
                    />
                    <path d="M 45 42.436 c -7.279 0 -13.2 -5.922 -13.2 -13.201 s 5.921 -13.2 13.2 -13.2 c 7.278 0 13.2 5.921 13.2 13.2 S 52.278 42.436 45 42.436 z" />
                  </g>
                </svg>
              </Marker>
            </Map>
          </section>
        </section>
      </section>

      {/* About Section */}
      <section className="centered-container">
        <section className="flex flex-col md:h-[400px] md:flex-row md:justify-between gap-8 md:gap-16">
          <Image
            image={photoGallery[0]}
            className="w-full md:!w-1/2 max-w-none"
          />
          <article className="flex flex-col w-full md:w-1/2 gap-8">
            <h2 className="text-2xl md:text-4xl font-bold">
              About {name} - {address.line1}
            </h2>
            <p>{description}</p>
            <nav className="flex flex-col md:flex-row gap-4">
              <button className="font-bold md:text-lg bg-secondary text-white w-full md:w-fit p-2  md:px-4 flex items-center justify-center border rounded-full">
                Get Directions
              </button>
              <button className="border-2 font-bold text-secondary border-secondary md:text-lg w-full md:w-fit p-2  md:px-4 flex items-center justify-center rounded-full">
                Call us
              </button>
            </nav>
          </article>
        </section>
      </section>

            {/* Featured Products */}
            {c_relatedProducts && (
        <section className="bg-accent">
          <ThreeGridLayout
            title={`Speciality at ${address.line1}`}
            relatedItems={c_relatedProducts}
            ctaCount={1}
          />
        </section>
      )}
      {/* <section className="bg-accent">
        <Testimonials />
      </section> */}

      {c_relatedProfessionals && (
        <Team
          title={"Meet Our Team"}
          people={c_relatedProfessionals}
          parentEntityName={`${address.city}, ${address.region}`}
        />
      )}

      {frequentlyAskedQuestions && (
        <section className="bg-accent">
          <Faqs
            faqs={frequentlyAskedQuestions}
            title={"Frequently Asked Questions"}
          />
        </section>
      )}

      {/* Recent Reviews */}
      <section className="bg-accent ">
        <section className="centered-container md:space-y-16">
          <header className=" space-y-2 text-center">
            <h2 className="text-2xl md:text-4xl font-bold">Recent Reviews</h2>
            <span className="flex items-center justify-center gap-2">
              <p className="font-bold">4.5</p>
              <span className="gap-0.5 flex">
                <StarRating selectedStars={4.5} />
              </span>
              <span className="font-normal">(21 reviews)</span>
            </span>
          </header>
          <ReviewsComponent />
        </section>
      </section>

      {relatedBlogs && (
        <section className="bg-accent">
          <Blogs
            linkedArticles={relatedBlogs}
            parentEntityName={name}
            title={"Insights"}
          />
        </section>
      )}

      {/* Featured Promo Section */}
      <section className="centered-container">
        <section className="flex flex-col md:h-[400px] md:flex-row md:justify-between gap-4 md:gap-16">
        {c_relatedPromo?.length > 0 && (
  <Image
    image={c_relatedPromo[0]?.c_backgroundImage}
    className="w-full md:!w-1/2 max-w-none"
  />
)}

          <article className="flex flex-col w-full md:w-1/2 gap-8">
            <h2 className="text-2xl md:text-4xl font-bold">
              Featured Promotion
            </h2>
            <p>{c_relatedPromo[0].description}</p>
            <nav className="flex flex-col md:flex-row gap-4">
              <button className="font-bold md:text-lg bg-secondary text-white w-full md:w-fit p-2  md:px-4 flex items-center justify-center border rounded-full">
                Learn more
              </button>
            </nav>
            <section className="flex gap-4">
              <img
                className="w-[119px] h-10"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Download_on_the_App_Store_RGB_blk.svg/2560px-Download_on_the_App_Store_RGB_blk.svg.png"
                alt=""
              />
              <img
                className="w-[119px] h-10"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                alt=""
              />
            </section>
          </article>
        </section>
      </section>


      {c_relatedEvents && (
        <ThreeGridLayout
          title="Upcoming Events"
          relatedItems={c_relatedEvents}
          titleAlignment="center"
          type="Event"
        />
      )}
      <article className="centered-container !py-8 block md:hidden border-t">
        <BreadCrumbs
          data={dm_directoryParents_hc_hf_directory}
          currAddress={address.line1}
        />
      </article>
      <ThreeGridLayout
        titleAlignment="center"
        title={`My Locations`}
        relatedItems={professionalLocations}
      />

      <ScrollToTop />
    </PageLayout>
  );
};

export default Location;
