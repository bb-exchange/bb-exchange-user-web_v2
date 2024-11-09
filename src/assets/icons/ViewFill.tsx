import * as React from "react";
import type { SVGProps } from "react";
const SvgViewFill = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#E3E7EB"
      d="M21 12c-1 4.418-4.582 8-9 8s-8-3.582-9-8c1-4.418 4.582-8 9-8s8 3.582 9 8"
    />
    <circle cx={12} cy={12} r={3} fill="#676DFF" />
  </svg>
);
export default SvgViewFill;
