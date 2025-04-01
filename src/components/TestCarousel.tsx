import { useState, useEffect, useRef, Children } from "react";
const classNameNames = (...classNamees: any) =>
  classNamees.filter(Boolean).join(" ");
const data = {
  resources: [
    {
      title: "Find me on Mastodon 1",
      link: "https://indieweb.social/@kendalmintcode",
      imageUrl: "https://placehold.co/300x300",
    },
    {
      title: "Welcome to K-Tech 2",
      link: "https://k-tech.systems",
      imageUrl: "https://placehold.co/300x300",
    },
    {
      title: "Some sort of third title 3",
      link: "https://indieweb.social/@kendalmintcode",
      imageUrl: "https://placehold.co/300x300",
    },
    {
      title: "Some sort of third title 4",
      link: "https://indieweb.social/@kendalmintcode",
      imageUrl: "https://placehold.co/300x300",
    },
    {
      title: "Some sort of third title 5",
      link: "https://indieweb.social/@kendalmintcode",
      imageUrl: "https://placehold.co/300x300",
    },
    {
      title: "Some sort of third title 6",
      link: "https://indieweb.social/@kendalmintcode",
      imageUrl: "https://placehold.co/300x300",
    },
    {
      title: "Super item number the last 7",
      link: "https://indieweb.social/@kendalmintcode",
      imageUrl: "https://placehold.co/300x300",
    },
  ],
};
const TestCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef<HTMLDivElement | null>(null);
  const slidesToShow = 3;

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => Math.max(prevState - slidesToShow, 0));
    }
  };

  const moveNext = () => {
    if (currentIndex + slidesToShow < data.resources.length) {
      setCurrentIndex((prevState) =>
        Math.min(prevState + slidesToShow, data.resources.length - slidesToShow)
      );
    }
  };

  useEffect(() => {
    if (carousel.current) {
      const slideWidth = carousel.current.offsetWidth / slidesToShow;
      carousel.current.scrollLeft = slideWidth * currentIndex;
    }
  }, [currentIndex, slidesToShow]);

  return (
    <div className="carousel my-12 mx-auto">
      <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
        Our epic carousel
      </h2>
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:bg-blue-900/75 text-black border-4 w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-blue-900/75 text-black border-4 w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-4 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {data.resources.map((resource, index) => (
            <div
              key={index}
              className="carousel-item flex-shrink-0 text-center relative w-1/3 h-64 snap-start"
            >
              <a
                href={resource.link}
                className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                style={{ backgroundImage: `url(${resource.imageUrl || ""})` }}
              >
                <img
                  src={resource.imageUrl || ""}
                  alt={resource.title}
                  className="w-full aspect-square hidden"
                />
              </a>
              <a
                href={resource.link}
                className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 z-10"
              >
                <h3 className="text-black py-6 px-3 mx-auto text-xl">
                  {resource.title}
                </h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestCarousel;
