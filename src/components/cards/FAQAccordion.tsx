import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { CardProps } from "@yext/search-ui-react";
import ResponseComponent from "../ResponseComponent";
import Cta from "../cta";

const FAQAccordion = ({ result }: CardProps<any>) => {
  const { question, answerV2, c_primaryCTA, c_secondaryCTA } = result.rawData;

  return (
    <section className="w-full cards">
      <article className="mx-auto w-full divide-y divide-secondary/5">
        <Disclosure as="section" className="p-2" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <h2 className=" text-left text-lg font-medium group-hover:opacity-80">
              {question}
            </h2>
            <ChevronDownIcon
              className={`size-5 fill-secondary group-hover:fill-secondary group-data-[open]:rotate-180 `}
            />
          </DisclosureButton>
          <DisclosurePanel
            transition
            className=" mt-2 flex flex-col  origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
          >
            <ResponseComponent response={answerV2} />
            <section
              className="flex flex-col md:flex-row gap-4 md:gap-8 justify-start md:items-center pt-4 pb-2"
              aria-label="Call to Actions"
            >
              {c_primaryCTA && (
                <Cta
                  cta={c_primaryCTA}
                  ctaType={"primaryCta"}
                  otherStyles="p-2  border-2"
                />
              )}
              {c_secondaryCTA && (
                <Cta
                  cta={c_secondaryCTA}
                  ctaType={"secondaryCta"}
                  otherStyles="p-2  border-2"
                />
              )}
            </section>
          </DisclosurePanel>
        </Disclosure>
      </article>
    </section>
  );
};

export default FAQAccordion;
