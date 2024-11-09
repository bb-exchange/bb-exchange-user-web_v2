import * as React from "react";
import type { SVGProps } from "react";
const SvgCancelFill = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g clipPath="url(#cancel_fill_svg__a)">
      <rect width={24} height={24} fill="#E3E7EB" rx={12} />
      <path
        fill="#233142"
        fillRule="evenodd"
        d="M17.693 6.195a.676.676 0 0 1 0 .943L7.232 17.805a.645.645 0 0 1-.925 0 .676.676 0 0 1 0-.943L16.768 6.195c.256-.26.67-.26.925 0"
        clipRule="evenodd"
      />
      <path
        fill="#233142"
        fillRule="evenodd"
        d="M6.307 6.195c.256-.26.67-.26.925 0l10.46 10.667a.676.676 0 0 1 0 .943.645.645 0 0 1-.924 0L6.308 7.138a.676.676 0 0 1 0-.943"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="cancel_fill_svg__a">
        <rect width={24} height={24} fill="#fff" rx={12} />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCancelFill;
