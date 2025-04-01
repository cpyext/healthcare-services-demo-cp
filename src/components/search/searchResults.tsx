import { useSearchState } from "@yext/search-headless-react";
import Loader from "../Loader";
import {
  AppliedFilters,
  Facets,
  Pagination,
  ResultsCount,
  VerticalResults,
  Geolocation,
  SpellCheck,
  UniversalResults,
  DirectAnswer,
  GenerativeDirectAnswer,
} from "@yext/search-ui-react";
import {
  GlobalConfig,
  UniversalConfig,
  VerticalConfig,
} from "../../config/VerticalConfig";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import MapPin from "../MapPin";
import { concatClassNames } from "../../utils/reusableFunctions";
import { createCtx } from "../../utils/createContext";
import { MapboxMaps, Map, Coordinate } from "@yext/pages-components";
import { IoClose } from "react-icons/io5";
import SortDropdown from "../SortDropdown";
import { buildSortOptions } from "./searchUItil";
type MapContextType = {
  hoveredId: string;
  setHoveredId: (value: string) => void;
  clickedId: string;
  setClickedId: (value: string) => void;
};

export const [useMapContext, MapContextProvider] = createCtx<MapContextType>(
  "Attempted to call useMapContext outside of MapContextProvider"
);

const SearchResults = () => {
  const [showFacets, setShowFacets] = useState(false);
  const [hoveredId, setHoveredId] = useState("");
  const [clickedId, setClickedId] = useState("");
  const _state = useSearchState((state) => state);
  const {
    vertical: { verticalKey, resultsCount = -1 },
    searchStatus: { isLoading },
    query: { mostRecentSearch },
    filters,
    universal,
  } = _state;
  const universalResultsLength =
    universal?.verticals?.[0]?.results?.length || 0;
  const facetsCount = filters?.facets?.length ?? 0;

  const currentVerticalConfig = VerticalConfig.find(
    (item) => item.verticalKey === verticalKey
  );

  const cardType = currentVerticalConfig?.cardType;
  const pageType = currentVerticalConfig?.pageType || "standard";
  const sortOptions = currentVerticalConfig?.sortFields;

  const getClasses = () => {
    const classesMap: { [key: string]: string } = {
      "grid-cols-2": "grid  grid-cols-1 md:grid-cols-2 gap-2",
      "grid-cols-3": "grid  grid-cols-1 md:grid-cols-3 gap-2",
      "grid-cols-4": "grid grid-cols-1 md:grid-cols-4 gap-2 ",
      standard: "flex flex-col border rounded-md",
    };
    return classesMap[pageType];
  };

  const renderGenDirectAnswer = () => {
    const isGenALoading = useSearchState(
      (state) => state.generativeDirectAnswer.isLoading
    );
    return (
      <>
        {isGenALoading ? (
          <section
            className="p-6 border border-gray-200 rounded-lg shadow-sm centered-container"
            aria-busy="true"
            aria-label="Loading content"
          >
            <div className="animate-pulse flex space-x-4">
              <div className="flex-1 space-y-6 py-1">
                <div
                  className="h-4 bg-slate-700 rounded w-1/4"
                  aria-hidden="true"
                ></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className="h-2 bg-slate-700 rounded col-span-3"
                      aria-hidden="true"
                    ></div>
                    <div
                      className="h-2 bg-slate-700 rounded col-span-3"
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div
                    className="h-2 bg-slate-700 rounded"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="h-2 bg-slate-700 rounded"
                    aria-hidden="true"
                  ></div>
                  <div
                    className="h-2 bg-slate-700 rounded"
                    aria-hidden="true"
                  ></div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <GenerativeDirectAnswer />
        )}
      </>
    );
  };

  return (
    <div className="px-4 ">
      {isLoading && <Loader />}
      <MapContextProvider
        value={{
          hoveredId,
          setHoveredId,
          clickedId,
          setClickedId,
        }}
      >
        {pageType === "universal" ? (
          <>
            {universalResultsLength >= 1 ? (
              <article className="centered-container   !space-y-4 !py-4">
                <SpellCheck
                  customCssClasses={{
                    spellCheckContainer: "text-tertiary",
                    link: "text-secondary",
                  }}
                />
                {GlobalConfig.isGenerativeDirectAnswerEnabled ? (
                  renderGenDirectAnswer()
                ) : (
                  <DirectAnswer
                    customCssClasses={{
                      directAnswerContainer: "mb-8",
                    }}
                  />
                )}
                {/* <DirectAnswer
                  customCssClasses={{
                    directAnswerContainer: "mb-8",
                  }}
                /> */}
                <UniversalResults
                  verticalConfigMap={UniversalConfig}
                  customCssClasses={{
                    sectionHeaderIconContainer: "hidden",
                    sectionHeaderLabel: "!pl-0",
                  }}
                />

                <footer aria-label="Geolocation">
                  <Geolocation
                    customCssClasses={{
                      button: "text-secondary ",
                    }}
                  />
                </footer>
              </article>
            ) : (
              <article className="centered-container !py-4">No Results</article>
            )}
          </>
        ) : (
          <>
            {resultsCount > 0 ? (
              <>
                {pageType === "map" ? (
                  <section className="flex flex-col">
                    <section className="w-full flex md:h-[950px] mb-8">
                      <article className="w-full md:w-2/5 h-full border-b">
                        <SpellCheck
                          customCssClasses={{
                            spellCheckContainer: "text-tertiary",
                            link: "text-secondary",
                          }}
                        />
                        <div className="w-full h-auto overflow-scroll relative">
                          <header className="bg-accent py-2">
                            <aside className=" flex items-center justify-between font-semibold text-tertiary  md:mr-2.5">
                              <ResultsCount
                                customCssClasses={{
                                  resultsCountContainer: "!mb-0",
                                }}
                              />
                              {facetsCount >= 1 && (
                                <div
                                  className=" hover:cursor-pointer font-semibold text-tertiary md:mr-2.5"
                                  onClick={(e) => setShowFacets(!showFacets)}
                                >
                                  Filters
                                </div>
                              )}
                            </aside>
                            {showFacets && (
                              <div className="w-full block absolute inset-0 bg-primary h-full md:h-[95vh] px-4 ">
                                <IoClose
                                  onClick={(e) => setShowFacets(false)}
                                  className="ml-auto h-6 w-6 md:h-8 md:w-8 md:mr-4 hover:cursor-pointer hover:border"
                                />
                                <Facets
                                  customCssClasses={{
                                    facetsContainer:
                                      "mr-10 !text-lg  text-secondary",
                                  }}
                                  searchOnChange={true}
                                />
                                <div className="flex flex-row gap-4 mb-8 items-center mt-4 text-sm">
                                  <div
                                    className="px-4 py-1 border bg-secondary  text-primary hover:cursor-pointer "
                                    onClick={(e) => setShowFacets(!showFacets)}
                                  >
                                    Apply
                                  </div>
                                  <div
                                    className="hover:cursor-pointer px-4 py-1 border border-secondary w-fit text-secondary"
                                    onClick={(e) => setShowFacets(false)}
                                  >
                                    Cancel
                                  </div>
                                </div>
                              </div>
                            )}
                            <AppliedFilters />
                          </header>
                          <VerticalResults
                            CardComponent={cardType!}
                            customCssClasses={{
                              verticalResultsContainer: concatClassNames(
                                getClasses(),
                                "overflow-scroll h-[900px] mb-12"
                              ),
                            }}
                          />
                        </div>
                      </article>
                      <article className="hidden md:block md:w-3/5">
                        <Map
                          apiKey={import.meta.env.YEXT_PUBLIC_MAP_API_KEY}
                          provider={MapboxMaps}
                          bounds={
                            _state.vertical.results
                              ? _state.vertical.results
                                  .map(
                                    (data) => data.rawData.yextDisplayCoordinate
                                  )
                                  .filter(
                                    (coord): coord is Coordinate => !!coord
                                  )
                              : [{ latitude: 125, longitude: 125 }]
                          }
                          padding={{
                            top: 100,
                            bottom: 200,
                            left: 50,
                            right: 50,
                          }}
                          className="h-[950px]"
                        >
                          {_state?.vertical?.results?.map((data, index) => (
                            <MapPin
                              key={index}
                              clickedId={clickedId}
                              hoveredId={hoveredId}
                              setHoveredId={setHoveredId}
                              setClickedId={setClickedId}
                              result={data}
                              type="verticalResults"
                            />
                          ))}
                        </Map>
                      </article>
                    </section>
                    <nav aria-label="Pagination" className="text-lg">
                      <Pagination
                        customCssClasses={{
                          paginationContainer: "text-lg",
                          label: "bg-white font-light",
                          selectedLabel: "bg-secondary text-primary",
                          icon: "text-tertiary",
                        }}
                      />
                    </nav>
                    <footer aria-label="Geolocation">
                      <Geolocation
                        customCssClasses={{
                          button: "text-secondary ",
                        }}
                      />
                    </footer>
                  </section>
                ) : (
                  <section className="w-full flex max-w-full md:px-14 mx-auto mt-4">
                    <aside className="hidden md:block w-[200px]">
                      {facetsCount >= 1 && (
                        <Facets
                          customCssClasses={{
                            facetsContainer: "py-4 w-full text-secondary",
                            titleLabel: "text-lg",
                          }}
                        />
                      )}
                    </aside>

                    <div className="relative md:px-14 md:max-w-screen-2xl w-full !mx-auto md:!pr-40">
                      <header className="results-header ">
                        <SpellCheck
                          customCssClasses={{
                            spellCheckContainer: "text-tertiary",
                            link: "text-secondary",
                          }}
                        />
                        <article className="hidden md:flex justify-between w-full items-center text-secondary">
                          <ResultsCount />
                          {sortOptions && sortOptions.length >= 1 && (
                            <div className="flex justify-start gap-2 md:mb-4">
                              <SortDropdown
                                sortOptions={buildSortOptions(sortOptions)}
                              />
                            </div>
                          )}
                        </article>
                        <article className="md:hidden flex items-center justify-between font-semibold text-tertiary  md:mr-2.5">
                          <ResultsCount
                            customCssClasses={{
                              resultsCountContainer: `!mb-0`,
                            }}
                          />
                          {facetsCount >= 1 && (
                            <div
                              onClick={() => setShowFacets(true)}
                              className="font-semibold text-tertiary  mr-2.5 whitespace-nowrap"
                            >
                              Filters
                            </div>
                          )}
                        </article>
                        {showFacets && (
                          <div className="h-full w-full z-40  absolute inset-0 bg-primary px-4">
                            <IoClose
                              onClick={(e) => setShowFacets(false)}
                              className="ml-auto h-6 w-6 mb-4 hover:cursor-pointer hover:border"
                            />
                            {sortOptions && sortOptions.length >= 1 && (
                              <div className="flex justify-start gap-2 md:mb-4">
                                <SortDropdown
                                  sortOptions={buildSortOptions(sortOptions)}
                                />
                              </div>
                            )}
                            <Facets searchOnChange={true} />
                            <div className="flex flex-row gap-4 mb-8 items-center mt-4 text-xl">
                              <div
                                className="px-4 py-2 border border-black"
                                onClick={(e) => setShowFacets(!showFacets)}
                              >
                                Apply
                              </div>
                              <div
                                className="hover:cursor-pointer px-4 py-2 text-[#027da5] w-fit hover:underline"
                                onClick={(e) => setShowFacets(false)}
                              >
                                Cancel
                              </div>
                            </div>
                          </div>
                        )}
                        <hr className="mb-8 w-full block md:hidden" />
                        <AppliedFilters />
                      </header>
                      <VerticalResults
                        CardComponent={cardType!}
                        customCssClasses={{
                          verticalResultsContainer:
                            concatClassNames(getClasses()),
                        }}
                      />
                      <nav aria-label="Pagination" className="mt-12 text-lg">
                        <Pagination
                          customCssClasses={{
                            paginationContainer: "text-lg",
                            label: "bg-white font-light",
                            selectedLabel: "bg-secondary text-primary",
                            icon: "text-tertiary",
                          }}
                        />
                      </nav>
                      <footer aria-label="Geolocation">
                        <Geolocation
                          customCssClasses={{
                            button: "text-secondary ",
                          }}
                        />
                      </footer>
                    </div>
                  </section>
                )}
              </>
            ) : (
              mostRecentSearch && (
                <article className="centered-container !py-4">
                  <p>
                    The search
                    <span className="mx-1 font-semibold">
                      {mostRecentSearch}
                    </span>
                    did not match any FAQs.
                  </p>
                </article>
              )
            )}
          </>
        )}
      </MapContextProvider>
    </div>
  );
};

export default SearchResults;
