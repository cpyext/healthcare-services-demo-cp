import {
  provideHeadless,
  UniversalLimit,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import { FocusedItemData, DropdownItem } from "@yext/search-ui-react";
import { VerticalConfig } from "../../config/VerticalConfig";
import { searchConfig } from "./config";
import { Image } from "@yext/pages-components";

export const entityPreviewSearcher = provideHeadless({
  ...searchConfig,
  headlessId: "entity-preview-searcher",
});
export const includedVerticalKeys =
  VerticalConfig.filter((item) => item.visualTypeHead)
    .map((item) => item.verticalKey)
    .filter((key): key is string => key !== undefined) || undefined;
export const universalLimit = VerticalConfig.filter(
  (item) => item.visualTypeHead
).reduce((acc: UniversalLimit, item) => {
  if (item.verticalKey) {
    acc[item.verticalKey] = item.universalLimit || 0;
  }
  return acc;
}, {} as UniversalLimit);

export const includedVerticals = VerticalConfig.filter(
  (item) => item.visualTypeHead
);
export const renderProductPreview = (
  result: any,
  imageField: any
): JSX.Element => {
  const imageData = imageField?.image || imageField;
  const numThumbnails = imageData?.thumbnails?.length || 0;
  const productThumbnail =
    numThumbnails > 0 ? imageData.thumbnails[numThumbnails - 1] : imageData;

  return (
    <div className="flex flex-col items-center cursor-pointer hover:bg-gray-100">
      {productThumbnail && (
        <Image image={productThumbnail} className="!max-w-none !w-32" />
      )}
      <div className="font-semibold pl-3">{result.name}</div>
    </div>
  );
};
export const renderEntityPreviews = (
  autocompleteLoading: boolean,
  verticalKeyToResults: Record<string, VerticalResultsData>,
  dropdownItemProps: {
    onClick: (
      value: string,
      _index: number,
      itemData?: FocusedItemData
    ) => void;
    ariaLabel: (value: string) => string;
  }
): JSX.Element | null => {
  return includedVerticals.length > 0 ? (
    <>
      {includedVerticals.map((item, index: number) => {
        if (!item.verticalKey || !(item.verticalKey in verticalKeyToResults))
          return null;
        const results = verticalKeyToResults[item.verticalKey]?.results?.map(
          (result) => result.rawData
        ) as any[] | undefined;

        return results && results.length > 0 ? (
          <div key={item.verticalKey} className="flex flex-col gap-2 px-8">
            {index !== 0 && <hr />}
            <div className="font-bold">{item.label}</div>
            <div
              className={`grid grid-cols-2 md:grid-cols-4 ${autocompleteLoading ? "opacity-50" : ""}`}
            >
              {results.map((result) => (
                <DropdownItem
                  key={result.id}
                  value={result.name}
                  onClick={() =>
                    history.pushState(null, "", `${result.landingPageUrl}`)
                  }
                  ariaLabel={dropdownItemProps.ariaLabel}
                >
                  {renderProductPreview(
                    result,
                    result.primaryPhoto ||
                      result.headshot ||
                      result.photoGallery[0]
                  )}
                </DropdownItem>
              ))}
            </div>
          </div>
        ) : null;
      })}
    </>
  ) : null;
};
