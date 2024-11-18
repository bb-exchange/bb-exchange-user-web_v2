import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    className="check_fill_svg"
    viewBox="0 0 16 16"
    {...props}
  >
    <circle cx={8} cy={8} r={6.667} fill="#676DFF" />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M11.336 5.963a.5.5 0 0 1 .034.707l-3.098 3.408a.833.833 0 0 1-1.206.028L4.98 8.02a.5.5 0 1 1 .707-.707l1.962 1.963 2.981-3.279a.5.5 0 0 1 .706-.034"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCheckFill;
