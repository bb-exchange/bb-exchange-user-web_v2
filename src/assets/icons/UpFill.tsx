import * as React from "react";
import type { SVGProps } from "react";
const SvgUpFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="up_fill_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#F1351C"
      d="M11.134 4.5a1 1 0 0 1 1.732 0L18.928 15a1 1 0 0 1-.866 1.5H5.938a1 1 0 0 1-.866-1.5z"
    />
  </svg>
);
export default SvgUpFill;
