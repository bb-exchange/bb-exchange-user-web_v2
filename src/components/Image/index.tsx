import { useMemo, useState } from "react";
import NextImage, { ImageLoaderProps, ImageProps } from "next/image";

const Image = ({
  src,
  loader,
  title,
  ...props
}: Omit<ImageProps, "loader"> & { loader?: boolean }) => {
  const [error, setError] = useState<boolean>(false);

  const imgPath = useMemo(
    () => (error ? "/assets/images/error_image.svg" : src),
    [error, src]
  );

  const imgLoader = useMemo(
    () =>
      loader && !error
        ? ({ src, width, quality }: ImageLoaderProps) =>
            `${src}?w=${width}&q=${quality || 75}`
        : undefined,
    [error, loader]
  );

  return (
    <NextImage
      loader={imgLoader}
      src={imgPath}
      onError={() => setError(true)}
      title={error ? "이미지를 불러오는데 실패했습니다" : title ?? undefined}
      {...props}
    />
  );
};

export default Image;
