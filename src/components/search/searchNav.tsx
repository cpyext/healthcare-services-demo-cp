import { useEffect, useRef, useState } from "react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { VerticalConfig, VerticalProps } from "../../config/VerticalConfig";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SearchUtils, setQueryParams } from "./searchUItil";

const SearchNav = () => {
  const searchActions = useSearchActions();
  const [activeItem, setActiveItem] = useState<VerticalProps | null>(
    VerticalConfig[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const queryString = useSearchState((state) => state.query.input);

  const initialPrevItem = VerticalConfig.find(
    (item) => item.label === "FAQs"
  ) || {
    label: "FAQs",
    pageType: "grid-cols-2",
  };
  const prevClickRef = useRef<VerticalProps>(initialPrevItem);

  const dropdownRef = useRef<HTMLLIElement>(null);

  const moreItems = VerticalConfig.filter(
    (item) => item !== activeItem && item.label !== "All"
  );

  const handleClick = (item: VerticalProps, query?: string) => {
    if (!item) return;

    if (activeItem && activeItem?.label !== "All") {
      prevClickRef.current = activeItem;
    }

    setActiveItem(item);

    setQueryParams(query || queryString, item.verticalKey);
    SearchUtils({
      vertical: item.verticalKey,
      query: query || "",
      searchActions,
    });
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const query = urlSearchParams.get("query") || queryString || "";
      const vertical = urlSearchParams.get("vertical");
      const selectedVertical = VerticalConfig.find(
        (item) => item.verticalKey === vertical
      );
      handleClick(selectedVertical || VerticalConfig[0], query);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="hidden md:block bg-transparent p-4 border-b border-accent uppercase">
        <ul className="flex justify-start w-full items-center">
          {VerticalConfig.map((item, index) => (
            <li
              key={index}
              onClick={() => handleClick(item)}
              className={`group hover:cursor-pointer px-5 uppercase `}
            >
              <span
                className={`uppercase text-lg font-medium group-hover:text-secondary/80 group-hover:border-b-4 group-hover:border-tertiary group-hover:pb-2
              ${
                activeItem === item
                  ? "text-secondary border-b-4 border-tertiary pb-2"
                  : "text-secondary/75"
              }`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="px-4 block md:hidden border-b border-accent ">
        <ul className="flex justify-start gap-8 items-center">
          <li className="mr-4">
            <button
              className={`pt-2 uppercase ${
                activeItem?.label === "All"
                  ? `text-secondary border-b-4 border-tertiary`
                  : `border-b-4 border-transparent text-secondary/75`
              }`}
              onClick={() => handleClick(VerticalConfig[0])}
            >
              All
            </button>
          </li>

          {activeItem?.label !== "All" && (
            <li className="mr-4 text-secondary border-b-4 border-tertiary">
              <button className="pt-2 uppercase">{activeItem?.label}</button>
            </li>
          )}

          {activeItem?.label === "All" && (
            <li>
              <button
                className="pt-2 text-secondary/75 uppercase border-b-4 border-transparent "
                onClick={() => {
                  const foundItem = VerticalConfig.find(
                    (item) => item.label === prevClickRef.current.label
                  );
                  if (foundItem) handleClick(foundItem);
                }}
              >
                {prevClickRef.current.label}
              </button>
            </li>
          )}

          <li className="relative mr-0 ml-auto" ref={dropdownRef}>
            <button
              className="uppercase flex items-center text-tertiary/75"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <BsThreeDotsVertical className="h-3 w-3" /> More
            </button>

            {isDropdownOpen && (
              <ul className="absolute text-secondary/75 bg-primary shadow-lg rounded-md mt-2 py-2 w-48 right-0 z-50">
                {moreItems
                  .filter((item) => item !== activeItem)
                  .map((item) => (
                    <li
                      key={item.label}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      <button
                        onClick={() => handleClick(item)}
                        className="uppercase"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SearchNav;
