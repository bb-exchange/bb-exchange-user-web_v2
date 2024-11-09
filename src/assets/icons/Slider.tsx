import * as React from "react";
import type { SVGProps } from "react";
const SvgSlider = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#233142"
      fillRule="evenodd"
      d="M12.888 15.343a.75.75 0 0 1 1.06 0l3.561 3.56 3.56-3.56a.75.75 0 0 1 1.062 1.06l-3.561 3.561a1.5 1.5 0 0 1-2.121 0l-3.561-3.56a.75.75 0 0 1 0-1.061"
      clipRule="evenodd"
    />
    <path
      fill="#233142"
      fillRule="evenodd"
      d="M17.509 9.395a.75.75 0 0 1 .75.75V19.5a.75.75 0 1 1-1.5 0v-9.355a.75.75 0 0 1 .75-.75M3.25 12a.75.75 0 0 1 .75-.75h7.364a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75M2.85 5.236a.75.75 0 0 1 .75-.75h13.91a.75.75 0 0 1 0 1.5H3.6a.75.75 0 0 1-.75-.75M2.85 18.327a.75.75 0 0 1 .75-.75h5.727a.75.75 0 0 1 0 1.5H3.6a.75.75 0 0 1-.75-.75"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgSlider;
