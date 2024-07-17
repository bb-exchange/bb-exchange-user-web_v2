import * as React from "react";
import { SVGProps } from "react";

const Bold = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} fill="none" {...props}>
    <path
      stroke="#111"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.332 6.666h7.333a4.667 4.667 0 0 1 4.667 4.667v0a4.667 4.667 0 0 1-4.667 4.666H9.332V6.666ZM9.332 16h8.667a4.667 4.667 0 0 1 4.666 4.667v0A4.667 4.667 0 0 1 18 25.333H9.332V16Z"
    />
  </svg>
);
export default Bold;
