import { Image, ImageType } from "@yext/pages-components";
import { format_date } from "../../utils/reusableFunctions";
import ResponseComponent from "../ResponseComponent";

interface BlogsCardProps {
  name: string;
  slug: string;
  primaryPhoto: ImageType;
  datePosted: string;
  shortDescriptionV2: any;
  bodyV2: any;
  id?: string;
}

interface BlogsProps {
  linkedArticles: BlogsCardProps[];
  parentEntityName?: string;
  title?: string;
}

interface BlogCardProps {
  _data: BlogsCardProps;
  showImage?: boolean;
  lineClamp?: number;
  index?: number;
}

const Blogs = ({
  linkedArticles,
  parentEntityName,
  title = "Blogs",
}: BlogsProps) => {
  if (linkedArticles.length === 0) {
    return null;
  }

  const _first: BlogsCardProps = linkedArticles[0];
  const _rest: BlogsCardProps[] = linkedArticles.slice(1, 4);

  return (
    <section className="centered-container">
      <h2 className="text-2xl md:text-4xl font-bold text-center">{title}</h2>
      <article className="hidden md:flex gap-8">
        <section className="flex flex-col gap-2 w-1/2">
          <BlogsCard _data={_first} showImage={true} lineClamp={4} />
        </section>
        <section className="flex flex-col gap-4 w-1/2">
          {_rest.map((item, index) => (
            <BlogsCard _data={item} key={index} lineClamp={3} />
          ))}
        </section>
      </article>
      <section className="flex flex-col  gap-6 w-full justify-between mx-auto md:hidden">
        {linkedArticles.map((item, index) => (
          <BlogsCard _data={item} key={index} lineClamp={3} index={index} />
        ))}
      </section>
      <a
        href={`/search.html?vertical=blog&query=${parentEntityName || ""}`}
        className={`justify-center rounded-full border-2 py-2 px-6 border-secondary mx-auto flex gap-1 items-center hover:cursor-pointer hover:underline text-secondary font-bold w-full md:w-fit`}
      >
        See All Articles
      </a>
    </section>
  );
};

export default Blogs;

const BlogsCard = ({
  _data,
  showImage = false,
  lineClamp,
  index,
}: BlogCardProps) => {
  return (
    <article
      className="flex flex-col gap-4"
      aria-labelledby={`blog-title-${_data.id}`}
    >
      {_data.primaryPhoto && (index === 0 || showImage) && (
        <Image
          loading="lazy"
          image={_data.primaryPhoto}
          className="!mb-4 w-full max-w-[700px] !aspect-video"
        />
      )}
      <time
        dateTime={_data.datePosted}
        className="font-normal"
        aria-label={`Posted on ${format_date(_data.datePosted)}`}
      >
        {format_date(_data.datePosted)}
      </time>
      <h3
        id={`blog-title-${_data.id}`}
        className={`text-secondary text-xl ${index === 0 || showImage ? `md:text-2xl` : `md:text-xl`} font-semibold`}
      >
        {_data.name}
      </h3>
      <div
        aria-label="Text description"
        className={`w-80 md:w-full text-base !font-normal ${
          lineClamp === 4 ? `line-clamp-4` : `line-clamp-3`
        }`}
      >
        <ResponseComponent response={_data.bodyV2} />
      </div>
      <a
        href={`/${_data.slug}`}
        className="text-secondary font-medium decoration-2 underline-offset-4 underline flex items-center"
      >
        Read more
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          ></path>
        </svg>
      </a>
      {!showImage && <hr />}
    </article>
  );
};
