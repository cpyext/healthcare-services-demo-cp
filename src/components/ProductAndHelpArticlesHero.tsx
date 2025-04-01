import { Image, ImageType, LexicalRichText } from "@yext/pages-components";
import ResponseComponent from "./ResponseComponent";
import Cta from "./cta";

interface ProductAndHelpArticlesHeroProps {
  name: string;
  shortDescription: typeof LexicalRichText;
  image: ImageType;
  isProduct?: boolean;
}

const ProductAndHelpArticlesHero = ({
  name,
  shortDescription,
  image,
  isProduct = false,
}: ProductAndHelpArticlesHeroProps) => {
  return (
    <section
      className={`lg:relative ${isProduct ? `bg-gray-50` : `bg-primary`}`}
    >
      <article className="mx-auto lg:max-w-7xl ">
        <header className="lg:relative z-10 lg:pt-14 lg:w-full lg:max-w-2xl">
          {!isProduct && (
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="lg:absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-primary lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>
          )}

          <section className="lg:relative px-6 py-8 lg:px-8 lg:py-56 lg:pr-24">
            <article className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <aside className="hidden mb-10 lg:flex">
                <p className="lg:relative rounded-full px-3 py-1 text-xs lg:text-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Get in contact with an advisor that understands your goals.{" "}
                  <a href="#" className="whitespace-nowrap font-semibold">
                    <span aria-hidden="true" className="lg:absolute inset-0" />
                    Find an advisor <span aria-hidden="true">&rarr;</span>
                  </a>
                </p>
              </aside>
              <h1 className="text-pretty text-4xl lg:text-5xl font-semibold tracking-tight sm:text-7xl">
                {name}
              </h1>
              <article
                aria-roledescription="short description"
                className="mt-8 lg:mt-10 text-pretty font-medium text-gray-500 text-lg"
              >
                <ResponseComponent response={shortDescription} />
              </article>
              <nav className="mt-8 lg:mt-10 flex items-center gap-x-6">
                <Cta
                  ctaType="primaryCta"
                  cta={{
                    label: "Book appointment",
                    link: "#",
                    linkType: "URL",
                  }}
                />

                <a href="#" className="text-sm font-semibold ">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </nav>
            </article>
          </section>
        </header>
      </article>
      <figure className=" lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <Image
          image={image}
          className="!aspect-[3/2] !object-cover lg:!aspect-auto lg:!h-full lg:!w-full"
        />
      </figure>
    </section>
  );
};

export default ProductAndHelpArticlesHero;
