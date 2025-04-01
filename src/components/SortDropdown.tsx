import {
  SortBy,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export type SortDropdownProps = {
  sortOptions: SortTypeProps[];
};

export type SortTypeProps = {
  label: string;
  sortBy: SortBy;
};

const SortDropdown = ({ sortOptions }: SortDropdownProps) => {
  const sortBys = useSearchState((state) => state.vertical.sortBys);
  const searchActions = useSearchActions();
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);
  const query = useSearchState((state) => state.query.input);

  const [selectedItem, setSelectedItem] = useState<string>("");

  const selectedSort = sortOptions.find(
    (s) =>
      s.sortBy?.field === sortBys?.[0]?.field &&
      s.sortBy?.direction === sortBys?.[0]?.direction
  );
  const resultsCount =
    useSearchState(
      (state) =>
        state.vertical.resultsCount ||
        state.vertical.noResults?.allResultsForVertical.resultsCount
    ) ?? 0;
  useEffect(() => {
    if (selectedSort) {
      setSelectedItem(selectedSort.label);
    }
  }, [selectedSort]);

  const handleTileClick = (sortBy: SortBy, label: string) => {
    setSelectedItem(label);
    searchActions.setSortBys([sortBy]);
    searchActions.executeVerticalQuery();
  };

  return (
    <>
      {resultsCount && (
        <>
          {/* Desktop Sort Menu */}
          <section className="hidden md:block relative text-sm ml-auto">
            <Menu
              as="nav"
              aria-label="Sort Options"
              className="relative inline-block text-left"
            >
              <MenuButton
                className="inline-flex w-full md:w-56 justify-between gap-x-1.5 rounded-md bg-primary px-3 py-2 text-sm text-secondary shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                aria-expanded="false"
              >
                <div
                  className="flex flex-col justify-start items-baseline"
                  aria-label="Sort options drawer"
                >
                  <span className="text-xs md:text-sm font-medium">
                    Sort Options
                  </span>
                  <span className="text-xs mt-1">
                    {selectedItem || "Select an option"}
                  </span>
                </div>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-secondary"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 w-full md:w-56 origin-top-right rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 transition-all ease-out duration-200"
              >
                <ul className="py-1">
                  {sortOptions.map((s) => (
                    <MenuItem
                      key={s.label}
                      onClick={() => handleTileClick(s.sortBy, s.label)}
                    >
                      {({ active }) => (
                        <li
                          className={`md:text-base text-xs flex h-6 md:h-10 w-full md:w-56 items-center px-2 ${
                            active ? "bg-gray-200" : "bg-primary"
                          } hover:bg-gray-300 cursor-pointer`}
                          role="menuitem"
                        >
                          {s.label}
                        </li>
                      )}
                    </MenuItem>
                  ))}
                </ul>
              </MenuItems>
            </Menu>
          </section>

          {/* Mobile Sort Options */}
          <section
            className="w-full md:hidden text-sm flex flex-col gap-2 justify-between mb-4"
            aria-labelledby="sort-heading"
          >
            <h2
              id="sort-heading"
              className="text-neutral-dark text-sm font-medium text-left"
            >
              Sort by
            </h2>
            <fieldset aria-label="Plan">
              <ul className="space-y-2">
                {sortOptions.map((option) => (
                  <li
                    key={option.label}
                    onClick={() => handleTileClick(option.sortBy, option.label)}
                    className="relative flex items-center"
                  >
                    <input
                      checked={option.label === selectedItem}
                      id={option.label}
                      name="plan"
                      type="radio"
                      aria-describedby={`${option.label}-description`}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      readOnly
                    />
                    <label
                      htmlFor={option.label}
                      className="ml-3 text-neutral text-sm font-normal cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          </section>
        </>
      )}
    </>
  );
};

export default SortDropdown;
