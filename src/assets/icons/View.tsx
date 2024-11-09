import * as React from "react";
import type { SVGProps } from "react";
const SvgView = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="#233142"
      strokeWidth={1.5}
      d="m2.252 12.023-.002-.003C5.1 7.936 8.64 6 11.984 6c3.984 0 7.578 2.62 9.766 5.997v.007l-.002.003C19.568 15.419 16.004 18 11.984 18c-4.066 0-7.555-2.57-9.732-5.977Z"
    />
    <path stroke="#233142" strokeWidth={1.5} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);
export default SvgView;
