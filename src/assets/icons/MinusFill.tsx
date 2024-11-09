import * as React from "react";
import type { SVGProps } from "react";
const SvgMinusFill = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <circle cx={10.002} cy={9.995} r={8.125} fill="#FFDDDB" />
    <path stroke="#F1351C" strokeLinecap="round" strokeWidth={1.5} d="M5.002 9.995h10" />
  </svg>
);
export default SvgMinusFill;
