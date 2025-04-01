import { DefaultRawDataType, SectionProps } from "@yext/search-ui-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapboxMaps, Map, Coordinate } from "@yext/pages-components";
import { VerticalConfig } from "../../config/VerticalConfig";
import MapPin from "../MapPin";
export const UniversalSection = ({
  results,
  header,
  CardComponent,
}: SectionProps<DefaultRawDataType>) => {
  if (!CardComponent) {
    return <div>Missing Card Component</div>;
  }

  const pageType = VerticalConfig.find(
    (item) => item.label === header?.props.label
  )?.pageType;

  const className = pageType?.includes("grid")
    ? `grid grid-cols-1 md:${pageType} md:gap-8`
    : `space-y-0`;

  return (
    <>
      {pageType!.includes("map") ? (
        <section className="border rounded-md">
          <h2 className="font-bold text-tertiary text-base md:text-lg py-4 pl-4 border h-full">
            {header?.props.label.toUpperCase()}
          </h2>
          <article className="hidden md:block md:w-full">
            <Map
              apiKey={import.meta.env.YEXT_PUBLIC_MAP_API_KEY}
              provider={MapboxMaps}
              padding={{
                top: 100,
                bottom: 200,
                left: 50,
                right: 50,
              }}
              bounds={
                results
                  ? results
                      .map((data) => data.rawData.yextDisplayCoordinate)
                      .filter((coord): coord is Coordinate => !!coord)
                  : [{ latitude: 125, longitude: 125 }]
              }
              className="h-96"
            >
              {results?.map((data, index) => (
                <MapPin
                  key={index}
                  type="universalResults"
                  result={data}
                  clickedId={""}
                  hoveredId={""}
                  setHoveredId={function (value: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  setClickedId={function (value: string): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              ))}
            </Map>
          </article>
          <div
            aria-label={`${header?.props.label} results section`}
            className={className}
          >
            {results.map((r: any, index: number) => (
              <CardComponent key={index} result={r} />
            ))}
          </div>
        </section>
      ) : (
        <section className="border rounded-md">
          <h2 className="font-bold text-base border md:text-lg py-4 pl-4 bg-primary text-tertiary h-full">
            {header?.props.label.toUpperCase()}
          </h2>
          <div
            aria-label={`${header?.props.label} results section`}
            className={className}
          >
            {results.map((r: any, index: number) => (
              <CardComponent key={index} result={r} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};
