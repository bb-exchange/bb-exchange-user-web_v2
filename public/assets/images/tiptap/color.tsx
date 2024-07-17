import * as React from "react";
import { SVGProps } from "react";

const Color = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <path
      stroke="#111"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9.332 25.334 6.667-16 6.666 16M11.664 20.334h8.667"
    />
    <circle cx={23.332} cy={7.334} r={2} fill={props.color} />
  </svg>
);
export default Color;
