import * as React from "react";
import type { SVGProps } from "react";
const SvgPlusFill = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <circle cx={10.002} cy={9.995} r={8.125} fill="#E1F8EB" />
    <path
      stroke="#10D66B"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M5.002 10.059h10M10.002 5v10"
    />
  </svg>
);
export default SvgPlusFill;
