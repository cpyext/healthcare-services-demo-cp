import { CardProps } from "@yext/search-ui-react";
import Cta from "../cta";
import ResponseComponent from "../ResponseComponent";
import ImageFormatter from "../ImageFormatter";

const ProductProminentImage = ({ result }: CardProps<any>) => {
  const {
    id,
    price,
    name,
    c_primaryCTA,
    c_shortDescriptionV2,
    landingPageUrl,
    primaryPhoto,
    c_secondaryCTA,
    slug,
  } = result.rawData;
  return (
    <article id={` product-card-${id}`} className={`group border rounded-lg `}>
      <header className={`relative flex flex-col `}>
        <a
          href={landingPageUrl}
          className={`aspect-square block overflow-hidden rounded-t-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 `}
        >
          {primaryPhoto && <ImageFormatter image={primaryPhoto!} />}
        </a>
        <h2 className=" text-lg font-bold px-4 mt-4">
          <a href={landingPageUrl}>{name}</a>
        </h2>
        {price && <p>${price.value}</p>}
      </header>
      {c_shortDescriptionV2 && (
        <div className="px-4" aria-label="Answers Container">
          <ResponseComponent response={c_shortDescriptionV2} />
        </div>
      )}
      <section className={`px-4 space-y-1 `}>
        <footer
          className={`flex gap-2 justify-center pt-4 pb-2 items-center flex-col md:flex-row`}
        >
          <Cta
            cta={{ label: "Know more", linkType: "URL", link: `/${slug}` }}
            ctaType="primaryCta"
            otherStyles="border-2 font-medium"
          />
        </footer>
      </section>
    </article>
  );
};

export default ProductProminentImage;
