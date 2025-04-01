import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/pageLayout";
import { Address, AddressType, HoursStatus } from "@yext/pages-components";
import DirectoryMap from "../components/directory/DirectoryMap";
import { Fragment, useEffect, useState } from "react";
import { DirectoryChild } from "../types/directory";
import { BsBank, BsChevronRight } from "react-icons/bs";
import {
  ArrowLeftIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Cta from "../components/cta";
import { format_phone, getGoogleMapsLink } from "../utils/reusableFunctions";
import { GrAtm } from "react-icons/gr";
import { Transition } from "@headlessui/react";

export const config: TemplateConfig = {
  stream: {
    $id: "root-stream",
    filter: {
      entityTypes: ["ce_root"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.c_addressRegionAbbreviation",
      "dm_directoryChildren.id",
      "dm_directoryChildren.dm_childEntityIds",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.c_addressRegionAbbreviation",
      "dm_directoryChildren.dm_directoryChildren.dm_childEntityIds",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.c_addressRegionAbbreviation",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.yextDisplayCoordinate",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.address",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.hours",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.timezone",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.mainPhone",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.meta",
    ],
    localization: {
      locales: ["en"],
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Home Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: "",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
        },
      },
    ],
  };
};

const DirectoryRoot: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const { __meta } = document;
  const { dm_directoryChildren } = document;
  const [isForward, setIsForward] = useState<boolean | undefined>(undefined);
  const [currList, setCurrList] = useState<DirectoryChild[] | null>(
    dm_directoryChildren || null
  );
  const [historyStack, setHistoryStack] = useState<
    Array<{ list: DirectoryChild[]; title: string }>
  >([]);
  const [currTitle, setCurrTitle] = useState<string>("Select your state");
  const [isLast, setIsLast] = useState(false);
  const [showNewData, setShowNewData] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Flag to track initial load

  useEffect(() => {
    if (dm_directoryChildren) {
      setCurrList(dm_directoryChildren);
      setShowNewData(true);
      // setIsInitialLoad(false);
    }
  }, [dm_directoryChildren]);

  const triggerTransition = (newList: DirectoryChild[], newTitle: string) => {
    setShowNewData(false);
    setTimeout(() => {
      setCurrList(newList);
      setCurrTitle(newTitle);
      setShowNewData(true);
    }, 50);
  };

  const handleFilter = (currentId: string) => {
    if (!currList) return;
    const selectedItem = currList.find((item) => item.id === currentId);
    setIsInitialLoad(false);
    if (selectedItem && selectedItem.dm_directoryChildren) {
      setHistoryStack((prevStack) => [
        ...prevStack,
        { list: currList, title: currTitle },
      ]);
      triggerTransition(
        selectedItem.dm_directoryChildren,
        selectedItem.c_addressRegionAbbreviation || selectedItem.name
      );
      setIsForward(true);
      setIsLast(selectedItem?.dm_directoryChildren?.length === 0);
    }
  };

  const handlePrev = () => {
    if (historyStack.length > 0) {
      setIsInitialLoad(false);
      setIsForward(false);
      const prevState = historyStack[historyStack.length - 1];
      setHistoryStack((prevStack) => prevStack.slice(0, -1));
      triggerTransition(prevState.list, prevState.title);
    }
  };

  useEffect(() => {
    if (currList) {
      const hasChildren = currList.some((item) => item.dm_directoryChildren);
      setIsLast(!hasChildren);
    }
  }, [currList]);

  return (
    <>
      {currList && (
        <PageLayout _site={document._site} templateData={{ __meta, document }}>
          <article className="relative md:mt-6 mx-auto h-[800px] flex overflow-hidden">
            <aside className="md:absolute w-full md:w-1/4 top-12 left-12 z-30 bg-primary h-[700px] space-y-6 mx-auto overflow-hidden">
              <nav className="flex justify-start items-center mx-4 mt-6">
                {historyStack.length > 0 && (
                  <button onClick={handlePrev} className="text-secondary mr-4">
                    <ArrowLeftIcon className="h-6 w-6" />
                  </button>
                )}
                <h1 className="text-3xl text-secondary">{currTitle}</h1>
              </nav>

              <Transition
                as={Fragment}
                show={showNewData}
                enter={`${
                  !isInitialLoad &&
                  "transform transition ease-in-out duration-500"
                }`}
                enterFrom={`${
                  isForward ? `translate-x-full` : `-translate-x-full`
                }`}
                enterTo="translate-x-0"
              >
                <ul className="absolute flex flex-col h-full w-full overflow-y-scroll">
                  {currList.map((item, index) => (
                    <li
                      key={index}
                      onClick={() =>
                        item.dm_directoryChildren && handleFilter(item.id)
                      }
                      className={`border-secondary flex-col gap-6 border-b last:border-b-0 py-4 first:pt-0 flex ${
                        item.dm_directoryChildren
                          ? `hover:cursor-pointer`
                          : `hover:cursor-default`
                      }`}
                    >
                      {!item.address && (
                        <span className="flex text-tertiary w-full justify-between items-center px-4">
                          <h2 className="text-lg">
                            {item.c_addressRegionAbbreviation || item.name}
                          </h2>
                          {item.dm_childEntityIds?.length && (
                            <span className="flex items-center justify-between">
                              <span className="w-6 h-6 text-sm rounded-full bg-secondary text-primary flex items-center justify-center">
                                {item.dm_childEntityIds?.length || 0}
                              </span>
                              <span>
                                <BsChevronRight className="ml-1 text-secondary h-6 w-6 stroke-1" />
                              </span>
                            </span>
                          )}
                        </span>
                      )}
                      {item.address && <BuildAddressCard currItem={item} />}
                    </li>
                  ))}
                </ul>
              </Transition>
            </aside>

            <section className="hidden md:block flex-grow z-20  h-full">
              <DirectoryMap results={currList} showPins={isLast} />
            </section>
          </article>
        </PageLayout>
      )}
    </>
  );
};

export default DirectoryRoot;

const BuildAddressCard = ({ currItem }: { currItem: DirectoryChild }) => {
  const {
    name,
    mainPhone,
    address,
    yextDisplayCoordinate,
    hours,
    timezone,
    slug,
    meta,
  } = currItem;

  return (
    <article className="flex text-secondary flex-col gap-2 py-4  mx-8  last:border-0 border-b border-secondary">
      <section className="flex justify-between items-center">
        <a href={slug} className="w-full hover:underline">
          <h3 className="flex text-lg justify-start items-center w-full">
            {meta.entityType.id === "location" ? (
              <BsBank className="mr-2" />
            ) : (
              <GrAtm className="mr-2" />
            )}
            {name}
          </h3>
        </a>
      </section>
      <section className="flex flex-col text-sm justify-between items-start ">
        <address className="not-italic w-full flex gap-2 flex-col">
          {address && (
            <section className="flex gap-2 items-base">
              <MapPinIcon className="h-4 w-4  mt-1" />
              <span className="ml-2">
                <Address
                  address={address as AddressType}
                  lines={[
                    ["line1", ",", "line2"],
                    ["city", ",", "region", "postalCode"],
                  ]}
                />{" "}
              </span>
            </section>
          )}
          <section className="flex gap-2 items-center">
            <PhoneIcon className="h-4 w-4" />
            <a href={`tel:${mainPhone}`} role="button" className="font-medium">
              {format_phone(mainPhone)}
            </a>
          </section>
          <HoursStatus hours={hours} timezone={timezone} />
        </address>

        {(yextDisplayCoordinate || mainPhone) && (
          <footer
            className="flex flex-row items-center md:items-end justify-center gap-2 pt-4 pb-2 w-full"
            aria-label="Call to Actions"
          >
            {mainPhone && (
              <Cta
                cta={{
                  label: "Call",
                  link: `tel:${mainPhone}`,
                  linkType: "URL",
                }}
                ctaType="primaryCta"
                aria-label="Primary call to action"
              />
            )}
            {yextDisplayCoordinate && (
              <Cta
                cta={{
                  label: "Get Directions",
                  link: getGoogleMapsLink(yextDisplayCoordinate),
                  linkType: "URL",
                }}
                ctaType="secondaryCta"
                aria-label="Secondary call to action"
              />
            )}
          </footer>
        )}
      </section>
    </article>
  );
};
