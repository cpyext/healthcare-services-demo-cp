import { LexicalRichText } from "@yext/pages-components";
import { CSSProperties, ReactNode, useMemo, useState } from "react";
import Markdown from "react-markdown";
import { concatClassNames } from "../utils/reusableFunctions";

interface ResponseComponentProps {
  response: any;
  showMore?: boolean;
  showMoreButton?: boolean;
  classNames?: CSSProperties | string;
}
const headingClassNames = {
  h1: "text-black",
  h2: "text-black",
  h3: "text-black",
  h4: "text-black",
  h5: "text-black",
  h6: "text-black",
};
const ClampedContent = ({
  children,
  showMore,
  classNames = {},
}: {
  children: ReactNode;
  showMore: boolean;
  classNames?: CSSProperties | string;
}) => {
  const [isShowMore, setIsShowMore] = useState<boolean>(showMore);
  const lineClampClass = isShowMore ? "line-clamp-3" : "";
  return (
    <article aria-expanded={isShowMore} aria-labelledby="content-heading">
      <p
        id="response-text"
        className={concatClassNames(
          "transition-all duration-500 ease-in-out w-full",
          lineClampClass,
          typeof classNames === "string" ? classNames : ""
        )}
        style={{ overflow: "hidden" }}
      >
        {children}
      </p>
      {showMore && (
        <button
          className="Show more limits"
          name="Show more Limits"
          onClick={() => setIsShowMore(!isShowMore)}
          aria-expanded={!isShowMore}
          aria-controls="response-text"
          style={{
            display: "block",
            marginTop: "10px",
          }}
        >
          {isShowMore ? "Show More >" : "Show Less >"}
        </button>
      )}
    </article>
  );
};
const ResponseComponent = ({
  response,
  showMore = false,
  classNames = {},
}: ResponseComponentProps) => {
  const renderResponse = useMemo(() => {
    if (response && typeof response === "object") {
      if ("json" in response) {
        return (
          <LexicalRichText
            nodeClassNames={{
              heading: headingClassNames,
              text: { bold: "text-black" },
            }}
            serializedAST={JSON.stringify(response.json)}
          />
        );
      }

      if ("markdown" in response) {
        return <Markdown>{response.markdown}</Markdown>;
      }
    }

    if (typeof response === "string") {
      return <span aria-live="polite">{response}</span>;
    }

    return null;
  }, [response, headingClassNames]);

  return (
    <>
      {showMore ? (
        <ClampedContent showMore={showMore} classNames={classNames}>
          {renderResponse}
        </ClampedContent>
      ) : (
        renderResponse
      )}
    </>
  );
};

export default ResponseComponent;
