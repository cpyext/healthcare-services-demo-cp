import StarRating from "./starRating";

const reviews = [
  {
    id: 1,
    title: "Can't say enough good things",
    rating: 5,
    content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
      `,
    author: "Risako M",
    date: "May 16, 2021",
    datetime: "2021-01-06",
  },
  {
    id: 1,
    title: "Can't say enough good things",
    rating: 5,
    content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
      `,
    author: "Risako M",
    date: "May 16, 2021",
    datetime: "2021-01-06",
  },
  {
    id: 1,
    title: "Can't say enough good things",
    rating: 5,
    content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
      `,
    author: "Risako M",
    date: "May 16, 2021",
    datetime: "2021-01-06",
  },
  {
    id: 1,
    title: "Can't say enough good things",
    rating: 5,
    content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
      `,
    author: "Risako M",
    date: "May 16, 2021",
    datetime: "2021-01-06",
  },
  {
    id: 1,
    title: "Can't say enough good things",
    rating: 5,
    content: `
        <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
        <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
      `,
    author: "Risako M",
    date: "May 16, 2021",
    datetime: "2021-01-06",
  },
];
const ReviewsComponent = () => {
  return (
    <section className="divide-y divide-gray-200 border-b border-t border-gray-200">
      {reviews.map((review) => (
        <article
          key={review.id}
          className="py-6 lg:grid lg:grid-cols-12 lg:gap-x-8"
        >
          <div className="flex flex-col md:flex-row md:items-center text-base lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3 gap-2">
            <p className="text-lg font-medium ">{review.author}</p>
            <time
              dateTime={review.datetime}
              className="md:ml-4 md:border-l border-gray-200 md:pl-4 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
            >
              {review.date}
            </time>
          </div>
          <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4  xl:gap-x-8">
            <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0 space-y-2">
              <span className="flex items-center gap-2">
                <p className="font-bold">4.5</p>
                <span className="gap-0.5 flex">
                  <StarRating selectedStars={4.5} />
                </span>
              </span>

              <div className="mt-3 space-y-6  text-base ">
                Donec facilisis tortor ut augue lacinia, at viverra est semper.
                Sed sapien metus, scelerisque nec pharetra id, tempor a tortor.
                Pellentesque non dignissim neque. Ut porta viverra est, ut
                dignissim elit elementum ut.
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
};

export default ReviewsComponent;
