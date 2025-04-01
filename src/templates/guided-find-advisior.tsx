import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import GuidedSearch from "../components/GuidedSearch";
import PageLayout from "../components/pageLayout";
import Banner from "../components/banner";

export const getPath: GetPath<TemplateProps> = () => {
  return `guided-advisor-finder`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Guided Advisor Finder",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const GuidedDoctorFinder: Template<TemplateRenderProps> = ({ document }) => {
  const { __meta } = document;
  return (
    <PageLayout
      _site={document._site}
      hasBanner={true}
      templateData={{ __meta, document }}
    >
      <Banner
        backgroundImage={
          "https://a.mktgcdn.com/p/Kv4KDWsSWCn3y_x5VSRTLyN_AwatVuWE-Dp8ZSq0Z-w/1200x796.jpg"
        }
      >
        <header className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Find a Financial Advisor
          </h1>
          <p className="mt-3 text-xl text-primary">
            Unlock Your Financial Potential with Expert Guidance. Find the
            Perfect Financial Advisor to Secure Your Future.
          </p>
        </header>
      </Banner>
      <GuidedSearch></GuidedSearch>
    </PageLayout>
  );
};

export default GuidedDoctorFinder;
