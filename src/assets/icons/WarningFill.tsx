import * as React from "react";
import type { SVGProps } from "react";
const SvgWarningFill = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} fill="none" {...props}>
    <circle cx={30} cy={30} r={26} fill="#E3E7EB" />
    <path
      fill="#B2BBC6"
      fillRule="evenodd"
      d="M30 32.707a2.027 2.027 0 0 1-2.027-2.027V19.869a2.027 2.027 0 1 1 4.054 0v10.81c0 1.12-.908 2.028-2.027 2.028M30 42.158c1.12 0 2.027-.907 2.027-2.027V38.78a2.027 2.027 0 1 0-4.054 0v1.351c0 1.12.908 2.027 2.027 2.027"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgWarningFill;
