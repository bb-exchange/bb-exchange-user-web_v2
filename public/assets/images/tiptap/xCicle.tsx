import * as React from "react";
import { SVGProps } from "react";

const XCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none" {...props}>
    <circle cx={15} cy={15} r={14.5} fill="#fff" stroke="#F3F3F3" />
    <path stroke="red" d="m25.354 5.354-20 20" />
  </svg>
);
export default XCircle;
