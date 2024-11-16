import * as React from "react";
import type { SVGProps } from "react";
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="search_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={10} cy={10} r={7} stroke="#233142" strokeWidth={1.5} />
    <path
      fill="#233142"
      d="M19.42 20.48a.75.75 0 0 0 1.06-1.06zm-4.95-4.95 4.95 4.95 1.06-1.06-4.95-4.95z"
    />
  </svg>
);
export default SvgSearch;
