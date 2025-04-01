import {
  CardComponent,
  DefaultRawDataType,
  VerticalConfigMap,
} from "@yext/search-ui-react";
import EventStandard from "../components/cards/EventStandard";
import FAQAccordion from "../components/cards/FAQAccordion";
import JobStandard from "../components/cards/JobStandard";
import LocationStandard from "../components/cards/LocationStandard";
import ProfessionalLocationAndGrid from "../components/cards/ProfessionalLocationAndGrid";
import ProfessionalStandard from "../components/cards/ProfessionalStandard";
import ProductProminentImage from "../components/cards/ProductProminentImage";
import BlogCard from "../components/cards/BlogCard";
import { UniversalSection } from "../components/search/UniversalSection";
export interface GlobalConfigProps {
  accountEnv: "Production" | "Sandbox";
  searchExperienceVersion: "Production" | "Staging";
  chatExperienceVersion: "Production" | "Staging";
  isChatEnabled: boolean;
  locale: string;
  isGenerativeDirectAnswerEnabled: boolean;
  region: "US" | "EU";
}

export const GlobalConfig: GlobalConfigProps = {
  accountEnv: "Production", //Production or Sandbox
  searchExperienceVersion: "Production", // Production or Staging
  chatExperienceVersion: "Production", // Production or Staging
  isChatEnabled: true, //true or false, also fill YEXT_PUBLIC_CHAT_APIKEY and YEXT_PUBLIC_CHAT_BOTID to work
  locale: "en", // your locale eg: en_GB
  isGenerativeDirectAnswerEnabled: false, //true or false
  region: "US", //US or EU
};
export interface VerticalProps {
  label: string;
  verticalKey?: string;
  pageType:
    | "grid-cols-2"
    | "grid-cols-3"
    | "grid-cols-4"
    | "standard"
    | "map"
    | "universal";
  universalLimit?: number;
  verticalLimit?: number;
  sortFields?: string[];
  cardType?: CardComponent;
  visualTypeHead?: boolean;
}

export const VerticalConfig: VerticalProps[] = [
  {
    label: "All",
    pageType: "universal",
  },
  {
    label: "FAQs",
    verticalKey: "faq",
    pageType: "standard",
    cardType: FAQAccordion,
    universalLimit: 3,
  },
  {
    label: "Professionals",
    verticalKey: "healthcare-professional",
    pageType: "grid-cols-3",
    cardType: ProfessionalLocationAndGrid,
    universalLimit: 3,
  },
  {
    label: "Locations",
    verticalKey: "healthcare-facility",
    pageType: "map",
    cardType: LocationStandard,
    universalLimit: 3,
    verticalLimit: 6,
  },
  {
    label: "Jobs",
    verticalKey: "jobs",
    pageType: "standard",
    cardType: JobStandard,
    universalLimit: 3,
  },
  {
    label: "Blogs",
    verticalKey: "blog",
    pageType: "grid-cols-3",
    cardType: BlogCard,
    universalLimit: 3,
  },
  {
    label: "Events",
    verticalKey: "events",
    pageType: "standard",
    cardType: EventStandard,
    universalLimit: 3,
  },
  {
    label: "Products",
    verticalKey: "product",
    pageType: "grid-cols-3",
    cardType: ProductProminentImage,
    universalLimit: 3,
    sortFields: ["name"],
  },
];
export const UniversalConfig: VerticalConfigMap<
  Record<string, DefaultRawDataType>
> = VerticalConfig.reduce(
  (configMap, item) => {
    if (item.verticalKey) {
      configMap[item.verticalKey] = {
        CardComponent: item.cardType,
        SectionComponent: UniversalSection,
        label: item.label,
      };
    }
    return configMap;
  },
  {} as VerticalConfigMap<Record<string, DefaultRawDataType>>
);

/** Sample Sort options */
// sortByOptions: [
//   {
//     label: "Name: A-Z",
//     sortBy: {
//       field: "name",
//       direction: Direction.Ascending,
//       type: SortType.Field,
//     },
//   },
//   {
//     label: "Name: Z-A",
//     sortBy: {
//       field: "name",
//       direction: Direction.Descending,
//       type: SortType.Field,
//     },
//   },
// ],
