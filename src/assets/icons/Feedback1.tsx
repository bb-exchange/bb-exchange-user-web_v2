import * as React from "react";
import type { SVGProps } from "react";
const SvgFeedback1 = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#feedback1_svg__a)"
    >
      <path d="M2.582 17.54c.31.31.729.484 1.166.484h3.85v3.3l4.4-3.3h8.25a1.65 1.65 0 0 0 1.65-1.65V4.824a1.65 1.65 0 0 0-1.65-1.65h-16.5a1.65 1.65 0 0 0-1.65 1.65v11.55c0 .438.174.858.484 1.167" />
      <path d="M6.498 11.203v-1.05a2.2 2.2 0 0 1 2.2-2.2h7.7l-1.856-2.03M17.499 10.324v1.05a2.2 2.2 0 0 1-2.2 2.2h-7.7l1.856 2.03" />
    </g>
    <defs>
      <clipPath id="feedback1_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgFeedback1;
