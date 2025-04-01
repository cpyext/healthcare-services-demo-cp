import { Address, AddressType, Image } from "@yext/pages-components";
import { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import ResponseComponent from "./ResponseComponent";

const RelatedData = ({ relatedData, name, type = "non_product" }: any) => {
  const [relatedProfessionals, setRelatedProfessionals] = useState<any[]>([]);
  const [relatedLocations, setRelatedLocations] = useState<any[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    const relProducts = type === "parent_product" && [relatedData];
    const relProfs =
      type !== "parent_product" &&
      relatedData.filter(
        (item: any) => item.meta.entityType.id == "financialProfessional"
      );
    const relLocs =
      type !== "parent_product" &&
      relatedData.filter((item: any) => item.meta.entityType.id == "location");

    relProducts && setRelatedProducts(relProducts);
    relLocs && setRelatedLocations(relLocs);
    relProfs && setRelatedProfessionals(relProfs);
  }, []);

  return (
    <article className="flex flex-col">
      {relatedProducts && relatedProducts.length >= 1 && (
        <section className="flex flex-col ">
          <h3 className=" text-secondary text-2xl mb-4">Related Product</h3>
          <ul role="list" className="flex flex-col list-none gap-8">
            {relatedProducts.slice(0, 3).map((product: any, index: any) => {
              return (
                <li
                  key={index}
                  className="rounded-lg space-y-0 pb-4 bg-primary border group relative top-0"
                >
                  {product.primaryPhoto && (
                    <Image
                      image={product.primaryPhoto}
                      className="pointer-events-none object-cover group-hover:opacity-75"
                    />
                  )}
                  <a
                    href={`/${product.slug}`}
                    className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <FaLink className="fill-secondary text-2xl" />
                  </a>
                  <p className="pointer-events-none block truncate font-medium text-secondary text-lg md:text-xl p-2">
                    {product.name}
                  </p>
                  <article className="text-sm px-2 line-clamp-3">
                    <ResponseComponent
                      response={product.c_shortDescriptionV2}
                    />
                  </article>
                </li>
              );
            })}
          </ul>
          {relatedProfessionals.length >= 4 && (
            <a
              href={`/search.html?vertical=financial-professional&query=${name}`}
              className="text-secondary flex gap-2 items-center mt-4 hover:underline"
            >
              More Professionals{" "}
              <IoIosArrowRoundForward className="h-6 w-6 fill-secondary" />
            </a>
          )}
        </section>
      )}
      {relatedProfessionals && relatedProfessionals.length >= 1 && (
        <section className="flex flex-col w-full">
          <h3 className="text-secondary text-2xl mb-4">
            Related Professionals
          </h3>
          <ul role="list" className="flex flex-col list-none gap-4 m-0 mb-8">
            {relatedProfessionals
              .slice(0, 3)
              .map((professional: any, index: any) => (
                <li
                  key={index}
                  className="rounded-lg bg-primary border group relative w-full overflow-hidden box-border"
                >
                  {professional.headshot && (
                    <Image
                      image={professional.headshot}
                      className="pointer-events-none object-cover w-full group-hover:opacity-75"
                    />
                  )}
                  <a
                    href={`/${professional.slug}`}
                    className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <FaLink className="fill-secondary text-2xl" />
                  </a>
                  <p className="pointer-events-none block truncate font-medium text-secondary text-lg md:text-xl p-4">
                    {professional.name}
                  </p>
                </li>
              ))}
          </ul>
          {relatedProfessionals.length >= 4 && (
            <a
              href={`/search.html?vertical=financial-professional&query=${name}`}
              className="text-secondary flex gap-2 items-center mt-4 hover:underline"
            >
              More Professionals{" "}
              <IoIosArrowRoundForward className="h-6 w-6 fill-secondary" />
            </a>
          )}
        </section>
      )}
      {relatedLocations && relatedLocations.length >= 1 && (
        <section className="flex flex-col">
          <h3 className="mb-4 text-secondary text-2xl">Related Locations</h3>

          <ul role="list" className="flex flex-col list-none gap-8">
            {relatedLocations.slice(0, 3).map((location: any, index: any) => {
              return (
                <li
                  key={index}
                  className="rounded-lg space-y-4 bg-primary border p-4 group relative top-0 text-tertiary"
                >
                  <a
                    href={`/${location.slug}`}
                    className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <FaLink className="fill-secondary text-2xl" />
                  </a>
                  <p className="text-lg md:text-xl  pointer-events-none block truncate font-medium text-secondary">
                    {location.name}
                  </p>
                  {location?.address?.countryCode && (
                    <Address
                      address={location.address as AddressType}
                      className="text-base"
                    />
                  )}
                </li>
              );
            })}
          </ul>
          {relatedLocations.length >= 4 && (
            <a
              href={`/search.html?vertical=locations&query=${name}`}
              className="text-secondary flex gap-2 items-center mt-4 hover:underline"
            >
              More Locations{" "}
              <IoIosArrowRoundForward className="h-6 w-6 fill-secondary" />
            </a>
          )}
        </section>
      )}
    </article>
  );
};

export default RelatedData;
