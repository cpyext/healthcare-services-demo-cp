import { useState, useEffect } from "react";
import { GoMoveToTop } from "react-icons/go";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 300);
      });
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <article
          className=" cursor-pointer p-2 rounded-full fixed bottom-24 md:bottom-32 md:right-12 right-6 md:h-12 md:w-12 h-10 w-10 bg-secondary flex items-center justify-center z-50"
          onClick={scrollToTop}
          aria-label="Scroll to Top"
        >
          <GoMoveToTop className="h-8 w-8 fill-primary" />
        </article>
      )}
    </>
  );
};

export default ScrollToTop;
