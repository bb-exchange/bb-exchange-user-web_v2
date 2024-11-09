import * as React from "react";
import type { SVGProps } from "react";
const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.56 20H8.268M8.269 20H3.753A.753.753 0 0 1 3 19.247v-4.205a.74.74 0 0 1 .216-.527l11.29-11.29a.75.75 0 0 1 1.073 0l4.197 4.196a.75.75 0 0 1 0 1.072zM12.032 5.699l5.269 5.269"
    />
  </svg>
);
export default SvgEdit;
