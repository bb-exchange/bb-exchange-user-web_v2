import * as React from "react";
import type { SVGProps } from "react";
const SvgFeedback2 = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#feedback2_svg__a)"
    >
      <path d="M21.85 5.476v11a1.65 1.65 0 0 1-1.65 1.65h-8.25l-4.4 3.3v-3.3H3.7a1.65 1.65 0 0 1-1.65-1.65v-11a1.65 1.65 0 0 1 1.65-1.65h13.75" />
      <path d="M16.878 9.877H14.15V7.31a.39.39 0 0 1 .113-.273l5.844-5.844a.39.39 0 0 1 .555 0l2.172 2.172a.39.39 0 0 1 0 .555zM7 8.776h4.4M7 13.176h9.35" />
    </g>
    <defs>
      <clipPath id="feedback2_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgFeedback2;
