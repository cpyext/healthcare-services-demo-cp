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
import { Image } from "@yext/pages-components";
import Cta from "../components/cta";
import ResponseComponent from "../components/ResponseComponent";
import RelatedData from "../components/relatedData";
import { format_date } from "../utils/reusableFunctions";
import ScrollToTop from "../components/scrollToTop";

export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-ha-product",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_image",
      "c_shortDescriptionV2",
      "shortDescriptionV2",
      "bodyV2",
      "richTextDescriptionV2",
      "primaryPhoto",
      "c_relatedBlogs.name",
      "c_relatedBlogs.headshot",
      "c_relatedBlogs.address",
      "c_relatedBlogs.mainPhone",
      "c_relatedBlogs.meta",
      "c_relatedBlogs.slug",
      "c_relatedBlogs.id",
      "parentProduct.name",
      "parentProduct.slug",
      "parentProduct.primaryPhoto",
      "parentProduct.id",
      "parentProduct.c_shortDescriptionV2",
      "parentProduct.meta",
      "datePosted",
      "c_parentEntityType",
      "c_category",
    ],
    filter: {
      entityTypes: ["ce_blog", "product"],
      savedFilterIds: ["1401364440"],
    },
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.name.replaceAll(" ", "-")}
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "FINS | InsightsAndProducts",
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

const InsightsAndProducts: Template<TemplateRenderProps> = ({ document }) => {
  const {
    __meta,
    _site,
    name,
    c_image,
    c_shortDescriptionV2,
    bodyV2,
    richTextDescriptionV2,
    primaryPhoto,
    shortDescriptionV2,
    meta,
    slug,
    c_relatedBlogs,
    parentProduct,
    datePosted,
    c_parentEntityType,
    c_category,
  } = document;

  return (
    <PageLayout _site={_site} templateData={{ __meta, document }}>
      <article
        className={` ${
          meta.entityType.id === "product" ? `bg-primary` : `bg-accent`
        }`}
      >
        <section
          className="centered-container flex gap-4 md:gap-8 flex-col md:flex-row justify-between text-left !space-y-0 !py-2 w-full md:!px-40"
          aria-labelledby="main-content-heading"
        >
          <aside
            className=" w-full md:w-4/5 ml-0 !text-lg flex flex-col gap-4 rounded-xl"
            aria-label="Contact Information"
          >
            <header>
              <h2
                id="main-content-heading"
                className="text-2xl md:text-4xl font-bold "
              >
                {name}
              </h2>
            </header>
            <article className="text-lg space-y-2">
              <ResponseComponent
                response={c_shortDescriptionV2 || shortDescriptionV2}
              />
            </article>
          </aside>
          <footer className="self-center md:flex md:justify-end w-full md:w-1/5">
            <Cta
              cta={{ link: "", linkType: "Phone", label: "Call us" }}
              ctaType={"secondaryCta"}
              otherStyles={"rounded-full md:!w-3/4 no-underline"}
            />
          </footer>
        </section>
        <section className="centered-container !py-4 md:relative mx-auto">
          <Image
            image={c_image || primaryPhoto}
            className="md:max-h-[500px] w-full rounded-lg"
          />
          <section
            className={`md:rounded-t-lg md:bg-primary md:relative md:-top-48 gap-2 md:gap-8 md:mx-8 justify-between m-auto text-pretty font-medium 
        text-sm sm:text-xl/8 py-2 md:py-8 lg:py-2 flex flex-col md:flex-row md:px-8`}
            aria-labelledby="content-section-heading"
          >
            <header
              className={`${
                c_relatedBlogs || parentProduct ? `md:!w-4/5` : `md:w-full`
              } flex flex-col prose !max-w-none w-full`}
            >
              <section
                className="flex flex-wrap gap-1 items-center md:gap-4 text-sm md:text-base -mb-12"
                aria-label="Meta Information"
              >
                {datePosted && <p>{format_date(datePosted)}</p>}
                {c_parentEntityType && (
                  <span className="rounded-full border p-1 px-2 bg-red-200">
                    {c_parentEntityType}
                  </span>
                )}
                {c_category && (
                  <span className="rounded-full border p-1 px-2 bg-gray-300">
                    {c_category}
                  </span>
                )}
              </section>
              {bodyV2 ? (
                <ResponseComponent response={bodyV2} />
              ) : (
                <ResponseComponent response={richTextDescriptionV2} />
              )}
              <footer className="md:pb-6 hidden md:block ">
                <Cta
                  cta={{ link: "", linkType: "Phone", label: "Call us" }}
                  ctaType={"secondaryCta"}
                  otherStyles={"rounded-full md:!w-1/2 no-underline"}
                />
              </footer>
            </header>
            <aside className="w-full md:w-1/5 flex flex-col gap-2  mt-2">
              {parentProduct && (
                <RelatedData
                  type={"parent_product"}
                  relatedData={parentProduct}
                  name={name}
                />
              )}
              {c_relatedBlogs && (
                <RelatedData relatedData={c_relatedBlogs} name={name} />
              )}
            </aside>
            <footer className="md:pb-6 md:hidden block">
              <Cta
                cta={{ link: "", linkType: "Phone", label: "Call us" }}
                ctaType={"secondaryCta"}
                otherStyles={"rounded-full"}
              />
            </footer>
          </section>
        </section>
      </article>
      <ScrollToTop />
    </PageLayout>
  );
};

export default InsightsAndProducts;
