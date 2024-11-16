import * as React from "react";
import type { SVGProps } from "react";
const SvgThumbUpGray = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    className="thumb_up_gray_svg"
    viewBox="0 0 28 28"
    {...props}
  >
    <path
      fill="#788799"
      d="M7.755 21.6V8.803a2.4 2.4 0 0 1 .466-1.41l3.745-5.113c.59-.818 2.058-1.398 3.307-.97 1.344.416 2.236 1.801 1.948 3.036l-.714 4.117a1.19 1.19 0 0 0 .288.983c.233.239.576.39.947.39h5.638c1.084 0 2.017.403 2.565 1.108.522.68.618 1.562.275 2.456l-3.375 9.432c-.425 1.562-2.277 2.834-4.115 2.834h-5.35c-.92 0-2.21-.29-2.8-.832L8.826 23.59c-.672-.466-1.07-1.21-1.07-1.99"
      opacity={0.35}
    />
    <path
      fill="#233142"
      d="M6.737 7.7H5.478c-1.894 0-2.664.69-2.664 2.39v11.554c0 1.7.77 2.39 2.664 2.39h1.26c1.894 0 2.664-.69 2.664-2.39V10.09c0-1.7-.77-2.389-2.665-2.389"
    />
  </svg>
);
export default SvgThumbUpGray;
