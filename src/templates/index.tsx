import {
  GetHeadConfig,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/pageLayout";

import Banner from "../components/banner";
import Carousel from "../components/Carousel";
import { SearchBar } from "@yext/search-ui-react";
import Cta from "../components/cta";
import Blogs from "../components/relatedSections/Blogs";
import ScrollToTop from "../components/scrollToTop";
import ThreeGridLayout from "../components/relatedSections/threeGridLayout";
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_heroSection",
      "slug",
      "c_relatedProducts.name",
      "c_relatedProducts.slug",
      "c_relatedProducts.c_shortDescriptionV2",
      "c_relatedProducts.primaryPhoto",
      "c_relatedProducts.id",
      "c_startYourJourney",
      "c_relatedBlogs.name",
      "c_relatedBlogs.bodyV2",
      "c_relatedBlogs.shortDescriptionV2",
      "c_relatedBlogs.primaryPhoto",
      "c_relatedBlogs.c_author",
      "c_relatedBlogs.datePosted",
      "c_relatedBlogs.slug",
    ],
    filter: {
      entityIds: ["veridian-home"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Healthcare | Homepage",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      },
    ],
  };
};

const Homepage: Template<TemplateRenderProps> = ({ document }) => {
  const {
    __meta,
    _site,
    c_heroSection,
    c_relatedProducts,
    c_startYourJourney,
  } = document;

  return (
    <PageLayout _site={_site} templateData={{ __meta, document }}>
      <Banner backgroundImage={c_heroSection.backgroundImage}>
        <section className="text-left space-y-8 w-full px-4 md:px-8 lg:px-20">
          <aside className="backdrop-brightness-150   relative w-full mt-16 md:mt-8 md:mx-auto md:w-3/4 lg:w-1/2 ml-0 text-primary lg:mx-auto p-4 flex flex-col gap-2 md:gap-4   backdrop-blur-md  ">
            <header className="text-lg md:text-4xl font-medium">
              <h2>{c_heroSection.name}</h2>
            </header>
            <article className="md:text-lg space-y-2 w-full">
              <p>{c_heroSection.bannerMessageHeadingRight}</p>
              <p>{c_heroSection.bannerMessageDescriptionRight}</p>
            </article>
            <footer>
              <Cta
                cta={{ link: "", linkType: "Phone", label: "Call us" }}
                ctaType={"secondaryCta"}
                otherStyles={"rounded-full px-8 py-2"}
              />
            </footer>
          </aside>
        </section>
      </Banner>
      {c_relatedProducts && (
        <section className="bg-accent">
          <ThreeGridLayout
            title={`Our Products`}
            relatedItems={c_relatedProducts}
            titleAlignment="center"
            ctaCount={1}
          />
        </section>
      )}
      {document.c_relatedBlogs && (
        <Blogs
          linkedArticles={document.c_relatedBlogs}
          parentEntityName={""}
          title={"Insights"}
        />
      )}
      {c_startYourJourney && (
        <Banner
          backgroundImage={c_startYourJourney.backgroundImage}
          maxHeight={`350px`}
        >
          <section className="h-full w-full md:w-full lg:w-1/3 m-auto gap-4 md:gap-8 flex flex-col justify-center items-center px-8 lg:px-0">
            <h2 className="text-xl md:text-4xl font-medium text-primary">
            Having a question about healthcare
            </h2>

            <SearchBar
              placeholder="Ask me a question..."
              customCssClasses={{
                searchBarContainer: "text-lg !w-full search",
                icon: "!text-black",
              }}
            />
          </section>
        </Banner>
      )}
      <ScrollToTop />
    </PageLayout>
  );
};

export default Homepage;
