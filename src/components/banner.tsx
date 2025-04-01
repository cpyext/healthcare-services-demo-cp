import { ImageType, Image } from "@yext/pages-components";

interface HeroBannerDetailsProps {
  backgroundImage: ImageType | string;
  children?: React.ReactNode;
  isMap?: boolean;
  maxHeight?: string;
}

const Banner = ({
  backgroundImage,
  children,
  isMap = false,
  maxHeight,
}: HeroBannerDetailsProps) => {
  const imageWidth =
    typeof backgroundImage === "string" ? 1920 : backgroundImage.width || 1920;

  const imageUrl =
    typeof backgroundImage === "string"
      ? {
          alternateText: "",
          height: 360,
          width: 640,
          url: backgroundImage,
        }
      : backgroundImage;

  return (
    <section className="relative h-auto banner">
      <Image
        image={imageUrl}
        className={`!object-center md:!object-right-top h-[450px] ${maxHeight ? `md:h-[350px]` : `md:h-[500px]`} !max-w-none !w-[${imageWidth}px] !bg-top`}
        loading="eager"
      />
      <figcaption className="absolute inset-0 z-2">
        <article
          className={`w-full h-full text-primary absolute bg-black ${
            isMap ? `bg-opacity-0` : `bg-opacity-50`
          } flex items-center justify-center flex-col`}
        >
          {children}
        </article>
      </figcaption>
    </section>
  );
};

export default Banner;
