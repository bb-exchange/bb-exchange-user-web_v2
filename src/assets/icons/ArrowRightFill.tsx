import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowRightFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    className="arrow_right_fill_svg"
    viewBox="0 0 16 16"
    {...props}
  >
    <rect width={16} height={16} fill="#E3E7EB" rx={8} />
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.516 8.01h6.968m0 0L8.98 5.047m2.505 2.963L8.98 11.118"
    />
  </svg>
);
export default SvgArrowRightFill;
