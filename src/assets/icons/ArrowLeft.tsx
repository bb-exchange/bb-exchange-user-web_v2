import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
      fill="#233142"
      d="M9.23 13.558a.5.5 0 0 1-.353-.146L4.53 9.065a1.827 1.827 0 0 1 0-2.573l4.347-4.347a.503.503 0 0 1 .706 0 .503.503 0 0 1 0 .707L5.237 7.198a.82.82 0 0 0 0 1.16l4.346 4.347a.503.503 0 0 1 0 .707.52.52 0 0 1-.353.146"
    />
  </svg>
);
export default SvgArrowLeft;
