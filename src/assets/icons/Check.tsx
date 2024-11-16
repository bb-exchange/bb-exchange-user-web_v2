import * as React from "react";
import type { SVGProps } from "react";
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    className="check_svg"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#233142"
      fillRule="evenodd"
      d="M8 13.667A5.667 5.667 0 1 0 8 2.333a5.667 5.667 0 0 0 0 11.334m0 1A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334"
      clipRule="evenodd"
    />
    <path
      fill="#233142"
      fillRule="evenodd"
      d="M11.336 5.963a.5.5 0 0 1 .034.707l-3.098 3.408a.833.833 0 0 1-1.206.028L4.98 8.02a.5.5 0 1 1 .707-.707l1.962 1.963 2.981-3.279a.5.5 0 0 1 .706-.034"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCheck;
