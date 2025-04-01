import { useState, useEffect, useRef } from "react";

export const useTypingEffect = () => {
  const [queryPrompts, setQueryPrompts] = useState<string[]>([]);
  const timerRef = useRef<number | null>(null);
  const indexRef = useRef(0);

  const typingEffect = () => {
    const word = queryPrompts[indexRef.current].split("");
    const loopTyping = () => {
      if (word.length > 0) {
        const ele = document.querySelector(".demo") as HTMLInputElement;
        ele.placeholder += word.shift();
        timerRef.current = setTimeout(loopTyping, 100);
      } else {
        deletingEffect();
      }
    };
    loopTyping();
  };

  const deletingEffect = () => {
    const word = queryPrompts[indexRef.current].split("");
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        const ele = document.querySelector(".demo") as HTMLInputElement;
        ele.placeholder = word.join("");
        timerRef.current = setTimeout(loopDeleting, 65);
      } else {
        indexRef.current = (indexRef.current + 1) % queryPrompts.length;
        typingEffect();
      }
    };
    loopDeleting();
  };

  const fetchUnivPrompts = async () => {
    const url = `https://cdn.yextapis.com/v2/accounts/me/search/autocomplete?v=20190101&api_key=${import.meta.env.YEXT_PUBLIC_SEARCH_API_KEY}&sessionTrackingEnabled=false&experienceKey=${import.meta.env.YEXT_PUBLIC_SEARCH_EXP_KEY}&input=`;

    try {
      const res = await fetch(url);
      const body = await res.json();
      const qs = body.response.results.map((item: any) => item.value);
      setQueryPrompts(qs);
    } catch (error) {
      console.error("Error fetching prompts:", error);
    }
  };

  useEffect(() => {
    fetchUnivPrompts();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (queryPrompts.length > 0) {
      typingEffect();
    }
  }, [queryPrompts]);

  return { queryPrompts };
};
