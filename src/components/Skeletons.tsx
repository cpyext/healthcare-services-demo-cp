export const BlogsLoader = () => (
  <section
    aria-hidden="true"
    className="w-full py-8 animate-pulse centered-container flex flex-col gap-4 md:gap-8"
  >
    <article
      className="hidden md:flex gap-8"
      aria-label="Loading featured and related articles"
    >
      <section className="flex-1 space-y-4" aria-labelledby="featured-skeleton">
        <header id="featured-skeleton" className="sr-only">
          Loading featured article
        </header>
        <figure className="bg-gray-300 h-48 rounded-md"></figure>
        <h3 className="bg-gray-300 h-6 w-3/4 rounded"></h3>
        <p className="bg-gray-300 h-4 w-full rounded"></p>
        <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
      </section>

      <section className="flex-1 space-y-6" aria-labelledby="related-skeleton">
        <header id="related-skeleton" className="sr-only">
          Loading related articles
        </header>
        <ul className="space-y-8">
          {[...Array(3)].map((_, index) => (
            <li key={index} className="space-y-3">
              <h4 className="bg-gray-300 h-6 w-2/3 rounded"></h4>
              <p className="bg-gray-300 h-4 w-full rounded"></p>
              <p className="bg-gray-300 h-4 w-1/2 rounded"></p>
            </li>
          ))}
        </ul>
      </section>
    </article>

    {/* Mobile Skeleton Loader */}
    <article className="md:hidden space-y-6" aria-label="Loading articles">
      <ul className="space-y-8">
        {[...Array(4)].map((_, index) => (
          <li key={index} className="flex gap-4">
            <figure className="bg-gray-300 h-24 w-32 rounded-md"></figure>
            <section
              className="flex-1 space-y-3"
              aria-labelledby={`mobile-skeleton-${index}`}
            >
              <h4
                id={`mobile-skeleton-${index}`}
                className="bg-gray-300 h-6 w-3/4 rounded"
              ></h4>
              <p className="bg-gray-300 h-4 w-full rounded"></p>
              <p className="bg-gray-300 h-4 w-2/3 rounded"></p>
            </section>
          </li>
        ))}
      </ul>
    </article>
  </section>
);

export const FaqsLoader = () => (
  <section
    aria-hidden="true"
    className="centered-container flex flex-col md:justify-start mx-auto items-start py-8 animate-pulse"
  >
    <header className="w-full">
      <h2 className="h-8 text-secondary text-2xl bg-gray-300 md:text-4xl font-medium rounded  mx-auto  text-center w-48"></h2>
    </header>

    <section className="w-full space-y-6 mt-4">
      <ul>
        {[...Array(4)].map((_, index) => (
          <li key={index} className="py-4">
            <article className="space-y-3">
              <header className="w-full bg-gray-300 h-6 rounded"></header>
              <div className="space-y-2">
                <p className="bg-gray-300 h-4 w-full rounded"></p>
                <p className="bg-gray-300 h-4 w-3/4 rounded"></p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  </section>
);

export const TeamLoader = () => (
  <section
    aria-hidden="true"
    className="centered-container  ƒmd:justify-center px-5  w-full  items-center animate-pulse mx-auto md:grid md:grid-cols-3 md:gap-12"
  >
    <header className="mx-auto md:max-w-2xl lg:mx-0 text-start w-full md:w-3/4 mt-0 self-start pt-2 md:pt-8">
      <h2 className="h-6 text-secondary text-2xl bg-gray-300 md:text-4xl font-medium rounded w-1/4 flex justify-start"></h2>
      <p className="mt-6 text-lg/8 text-tertiary bg-gray-300 rounded h-4 mx-auto"></p>
      <p className="mt-3 text-lg/8 text-tertiary bg-gray-300 rounded h-4 mx-auto"></p>
      <p className="mt-3 text-lg/8 text-tertiary bg-gray-300 rounded h-4 mx-auto"></p>
    </header>

    <ul
      role="list"
      className="mt-8 md:mt-0 mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 md:gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2"
    >
      {[...Array(4)].map((_, index) => (
        <li key={index} className="space-y-4">
          <figure className="bg-gray-300 h-40 w-full rounded-2xl"></figure>
          <h3 className="bg-gray-300 h-6 w-1/2 rounded"></h3>
          <p className="bg-gray-300 h-4 w-3/4 rounded"></p>
          <p className="bg-gray-300 h-4 w-full rounded"></p>
          <nav aria-label="Loading social media links" className="mt-4">
            <ul role="list" className="flex gap-x-6">
              <li className="bg-gray-300 h-6 w-6 rounded-full"></li>
              <li className="bg-gray-300 h-6 w-6 rounded-full"></li>
            </ul>
          </nav>
        </li>
      ))}
    </ul>
  </section>
);
