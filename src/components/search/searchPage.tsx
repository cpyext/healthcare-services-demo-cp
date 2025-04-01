import { SearchBar } from "@yext/search-ui-react";
import SearchNav from "./searchNav";
import SearchResults from "./searchResults";
import { FaMicrophone } from "react-icons/fa";
import { createRoot } from "react-dom/client";
import { useEffect, useState, useCallback } from "react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { SearchUtils, setQueryParams } from "./searchUItil";
import { useTypingEffect } from "../useTypeEffect";
import {
  entityPreviewSearcher,
  includedVerticalKeys,
  includedVerticals,
  renderEntityPreviews,
  universalLimit,
} from "./searchVisualAutoComplete";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const SearchPage = () => {
  const searchActions = useSearchActions();
  const { queryPrompts } = useTypingEffect();
  const [listening, setListening] = useState(false);
  const verticalKey = useSearchState((state) => state.vertical.verticalKey);

  const [micRoot, setMicRoot] = useState<ReturnType<typeof createRoot> | null>(
    null
  );

  const handleSpeechToText = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition API not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        handleSearch({ query: transcript });
      }
      setListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error detected: " + event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }, [searchActions]);

  useEffect(() => {
    const searchDiv = document.getElementsByClassName("search")[0];
    if (searchDiv && !micRoot) {
      const input = searchDiv.querySelector("input") as HTMLInputElement;
      if (input) {
        const nextDiv = input.nextSibling as HTMLElement;

        if (nextDiv && nextDiv.tagName === "DIV") {
          const micIcon = document.createElement("span");
          micIcon.style.cursor = "pointer";
          // micIcon.className = "text-secondary";
          const root = createRoot(micIcon);
          root.render(
            <FaMicrophone
              className={listening ? "mr-4 animate-pulse" : "mr-4"}
              size={24}
              onClick={handleSpeechToText}
            />
          );
          nextDiv.parentElement?.insertBefore(micIcon, nextDiv);
          setMicRoot(root);
        }
      }
    } else if (micRoot) {
      micRoot.render(
        <FaMicrophone
          className={listening ? "mr-4 animate-pulse" : "mr-4"}
          size={24}
          onClick={handleSpeechToText}
        />
      );
    }
  }, [listening, micRoot, handleSpeechToText]);

  const handleSearch = ({ query }: { query?: string | undefined }) => {
    setQueryParams(query, verticalKey);
    SearchUtils({
      vertical: verticalKey,
      query: query,
      searchActions,
    });
  };

  return (
    <main className="flex flex-col ">
      <header className="w-full centered-container !space-y-2 !py-0">
        {includedVerticals.length >= 1 ? (
          <SearchBar
            visualAutocompleteConfig={{
              entityPreviewSearcher: entityPreviewSearcher,
              includedVerticals: includedVerticalKeys || undefined,
              renderEntityPreviews: renderEntityPreviews,
              universalLimit: universalLimit,
              entityPreviewsDebouncingTime: 300,
            }}
            placeholder=""
            onSearch={handleSearch}
            customCssClasses={{
              icon: "text-secondary",
              searchBarContainer: "search",
              inputElement: queryPrompts.length >= 1 ? "demo" : undefined,
            }}
          />
        ) : (
          <SearchBar
            placeholder=""
            onSearch={handleSearch}
            customCssClasses={{
              icon: "fill-secondary",
              searchBarContainer: "search",
              inputElement: queryPrompts.length >= 1 ? "demo" : undefined,
            }}
          />
        )}
        <SearchNav />
      </header>
      <section aria-label="Search Results">
        <SearchResults />
      </section>
    </main>
  );
};

export default SearchPage;
