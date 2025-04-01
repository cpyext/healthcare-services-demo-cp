import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { searchConfig } from "./search/config";
import Footer from "./footer";
import Header from "./header";
import { Children, isValidElement, ReactNode } from "react";
import "../index.css";
import { GlobalConfig } from "../config/VerticalConfig";
import Banner from "./banner";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages-components";
import { TemplateProps } from "@yext/pages/*";
import ChatWidget from "./ChatWidget";

interface Props {
  _site?: any;
  children?: ReactNode;
  hasBanner?: boolean;
  templateData: TemplateProps;
}

const PageLayout = ({
  _site,
  children,
  hasBanner = false,
  templateData,
}: Props) => {
  const { c_primaryColor, c_secondaryColor, c_themeColor, c_accentColor } =
    _site;

  const containsBanner = Children.toArray(children).some((child) => {
    if (isValidElement(child)) {
      return child.type === Banner;
    }
    return false;
  });

  return (
    <article
    // style={
    //   {
    //     "--color-theme-primary": c_themeColor || null,
    //     "--color-text-primary": c_primaryColor || null,
    //     "--color-text-muted": c_secondaryColor || null,
    //     "--color-accent": c_accentColor || null,
    //   } as React.CSSProperties
    // }
    >
      <AnalyticsProvider
        apiKey={import.meta.env.YEXT_PUBLIC_ANALYTICS_APIKEY}
        templateData={templateData}
        currency="USD"
      >
        <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
          <AnalyticsScopeProvider name="header">
            <Header _site={_site} hasBanner={containsBanner} />
          </AnalyticsScopeProvider>

          <main id="main-content" className="min-h-screen" role="main">
            <section aria-label="Page Content">{children}</section>
          </main>

          <AnalyticsScopeProvider name="footer">
            <Footer _site={_site} />
          </AnalyticsScopeProvider>

          {/* Chat Widget */}
          {GlobalConfig.isChatEnabled && <ChatWidget />}
        </SearchHeadlessProvider>
      </AnalyticsProvider>
    </article>
  );
};

export default PageLayout;
