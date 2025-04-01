import {
  GetHeadConfig,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateRenderProps,
} from "@yext/pages";

import PageLayout from "../components/pageLayout";
import SearchPage from "../components/search/searchPage";

export const config: TemplateConfig = {
  name: "search",
};

export const getPath = () => {
  return `search.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Parkside Healthcare  | Search",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Capital fins Search",
        },
      },
    ],
  };
};

const Search: Template<TemplateRenderProps> = ({ document }) => {
  const { _site, __meta } = document;
  return (
    <PageLayout _site={_site} templateData={{ __meta, document }}>
      <article className="my-6">
        <SearchPage />
      </article>
    </PageLayout>
  );
};

export default Search;
