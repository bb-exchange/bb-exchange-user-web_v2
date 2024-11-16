import * as React from "react";
import type { SVGProps } from "react";
const SvgReturn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="return_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.778 10.222H8.333a4.907 4.907 0 0 0 0 9.778m12.445-9.778L14.556 4m6.222 6.222-6.222 6.222"
    />
  </svg>
);
export default SvgReturn;
