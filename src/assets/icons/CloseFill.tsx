import * as React from "react";
import type { SVGProps } from "react";
const SvgCloseFill = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g clipPath="url(#close_fill_svg__a)">
      <rect width={16} height={16} fill="#E3E7EB" rx={8} />
      <path
        fill="#233142"
        fillRule="evenodd"
        d="M11.795 4.13a.45.45 0 0 1 0 .629l-6.974 7.11a.43.43 0 0 1-.616 0 .45.45 0 0 1 0-.628l6.974-7.11a.43.43 0 0 1 .616 0"
        clipRule="evenodd"
      />
      <path
        fill="#233142"
        fillRule="evenodd"
        d="M4.205 4.13a.43.43 0 0 1 .616 0l6.974 7.111a.45.45 0 0 1 0 .629.43.43 0 0 1-.616 0L4.205 4.759a.45.45 0 0 1 0-.629"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="close_fill_svg__a">
        <rect width={16} height={16} fill="#fff" rx={8} />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCloseFill;
