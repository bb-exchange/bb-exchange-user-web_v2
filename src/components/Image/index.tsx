import NextImage, { ImageLoaderProps, ImageProps } from "next/image";

const Image = ({
  src,
  loader,
  isError = false,
  title,
  ...props
}: Omit<ImageProps, "loader"> & { loader?: boolean; isError?: boolean }) => {
  const imgPath = !isError ? src : "/assets/images/error_image.svg";

  const imgLoader =
    loader && !isError
      ? ({ src, width, quality }: ImageLoaderProps) =>
          `${src}?w=${width}&q=${quality || 75}`
      : undefined;

  return (
    <NextImage
      loader={imgLoader}
      src={imgPath}
      title={isError ? "이미지를 불러오는데 실패했습니다" : title ?? undefined}
      {...props}
    />
  );
};

export default Image;
