import * as React from "react";
import type { SVGProps } from "react";
const SvgDots = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <circle cx={18} cy={12} r={1.5} fill="#233142" />
    <circle cx={12} cy={12} r={1.5} fill="#233142" />
    <circle cx={6} cy={12} r={1.5} fill="#233142" />
  </svg>
);
export default SvgDots;
