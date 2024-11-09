import * as React from "react";
import type { SVGProps } from "react";
const SvgFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#233142"
      fillRule="evenodd"
      d="M16.84 5.646a.9.9 0 0 1 .9.9v13.618a.9.9 0 0 1-1.8 0V6.546a.9.9 0 0 1 .9-.9"
      clipRule="evenodd"
    />
    <path
      fill="#233142"
      fillRule="evenodd"
      d="M12.127 15.43a.9.9 0 0 1 1.273.003l3.44 3.456 3.44-3.456a.9.9 0 0 1 1.275 1.27L17.477 20.8a.9.9 0 0 1-1.275 0l-4.078-4.097a.9.9 0 0 1 .003-1.273M6.911 2.933a.9.9 0 0 1 .9.9V17.45a.9.9 0 1 1-1.8 0V3.833a.9.9 0 0 1 .9-.9"
      clipRule="evenodd"
    />
    <path
      fill="#233142"
      fillRule="evenodd"
      d="M6.911 2.932a.9.9 0 0 1 .638.265l4.078 4.097a.9.9 0 0 1-1.276 1.27l-3.44-3.456-3.44 3.456a.9.9 0 1 1-1.275-1.27l4.077-4.097a.9.9 0 0 1 .638-.265"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgFilter;
