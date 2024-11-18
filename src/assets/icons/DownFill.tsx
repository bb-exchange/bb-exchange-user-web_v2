import * as React from "react";
import type { SVGProps } from "react";
const SvgDownFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="down_fill_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#10D66B"
      d="M11.134 19.5a1 1 0 0 0 1.732 0L18.928 9a1 1 0 0 0-.866-1.5H5.938A1 1 0 0 0 5.072 9z"
    />
  </svg>
);
export default SvgDownFill;
