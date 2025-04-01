import { ImageType, Image } from "@yext/pages-components";

interface ImageFormatterProps {
  image: ImageType;
  loading?: "lazy" | "eager";
  className?: string;
}
const ImageFormatter = ({
  image,
  loading = "eager",
  className,
}: ImageFormatterProps) => {
  return (
    <Image
      image={image}
      loading={loading}
      className={`pointer-events-none object-cover group-hover:transition-transform group-hover:duration-300 group-hover:ease-linear scale-100 mix-blend-luminosity group-hover:scale-105 group-hover:mix-blend-normal will-change-transform h-full w-full ${className}`}
    />
  );
};

export default ImageFormatter;
