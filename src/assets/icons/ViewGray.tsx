import * as React from "react";
import type { SVGProps } from "react";
const SvgViewGray = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#B2BBC6"
      fillRule="evenodd"
      d="M19.972 12c-.99 3.976-4.204 7-7.972 7s-6.982-3.024-7.972-7C5.018 8.024 8.232 5 12 5s6.982 3.024 7.972 7M12 20c4.418 0 8-3.582 9-8-1-4.418-4.582-8-9-8s-8 3.582-9 8c1 4.418 4.582 8 9 8"
      clipRule="evenodd"
    />
    <path
      fill="#B2BBC6"
      fillRule="evenodd"
      d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgViewGray;
