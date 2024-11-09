import * as React from "react";
import type { SVGProps } from "react";
const SvgImg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <rect
      width={16}
      height={12.8}
      x={4}
      y={5.6}
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      rx={1.6}
    />
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M4 14.24 10.4 12l9.6 3.2v1.6a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 16.8zM15.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"
    />
  </svg>
);
export default SvgImg;
