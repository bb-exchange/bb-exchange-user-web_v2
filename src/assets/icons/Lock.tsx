import * as React from "react";
import type { SVGProps } from "react";
const SvgLock = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 12h1.75a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75v-8.5a.75.75 0 0 1 .75-.75H7m10 0V7c0-1.667-1-5-5-5S7 5.333 7 7v5m10 0H7M12 16v2"
    />
  </svg>
);
export default SvgLock;
