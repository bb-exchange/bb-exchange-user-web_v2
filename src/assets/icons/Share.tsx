import * as React from "react";
import type { SVGProps } from "react";
const SvgShare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="share_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M6.5 14.834a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M16.5 20.667a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5M8.658 13.592l5.692 3.316M14.342 7.758l-5.684 3.317"
    />
  </svg>
);
export default SvgShare;
