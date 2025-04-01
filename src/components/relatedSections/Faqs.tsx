import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ResponseComponent from "../ResponseComponent";

interface FaqProps {
  question: string;
  answer: string;
}

interface FaqsProps {
  faqs: FaqProps[];
  title: string;
}

const Faqs = ({ faqs, title = "FAQs" }: FaqsProps) => {
  return (
    <section aria-labelledby="faqs-title" className="centered-container">
      <header>
        <h2 id="faqs-title" className="text-2xl md:text-4xl font-bold">
          {title}
        </h2>
      </header>

      <ul className="w-full divide-y-2 divide-gray-300/25 border-y-2">
        {faqs.map((item, index) => (
          <li key={index} className="py-4">
            <Disclosure
              as="article"
              aria-labelledby={`faq-question-${index}`}
              defaultOpen={false}
            >
              <header>
                <DisclosureButton
                  className="  group flex w-full items-center justify-between"
                  aria-expanded="false"
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3
                    id={`faq-question-${index}`}
                    className="text-left text-lg font-bold group-hover:opacity-80"
                  >
                    {item.question}
                  </h3>
                  <ChevronDownIcon
                    className={`size-7 fill-secondary group-data-[open]:rotate-180`}
                  />
                </DisclosureButton>
              </header>

              <DisclosurePanel
                id={`faq-answer-${index}`}
                transition
                className="mt-2 text-left flex flex-col origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
              >
                <ResponseComponent response={item.answer} />
              </DisclosurePanel>
            </Disclosure>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Faqs;
