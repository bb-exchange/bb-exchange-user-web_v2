import NextImage, { ImageLoaderProps, ImageProps } from "next/image";

const Image = ({
  loader,
  ...props
}: Omit<ImageProps, "loader"> & { loader?: boolean }) => {
  const imgLoader = loader
    ? ({ src, width, quality }: ImageLoaderProps) =>
        `${src}?w=${width}&q=${quality || 75}`
    : undefined;

  return <NextImage loader={imgLoader} {...props} />;
};

export default Image;
