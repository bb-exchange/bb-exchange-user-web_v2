import * as React from "react";
import type { SVGProps } from "react";
const SvgTxtArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#233142"
      d="M11.306 5.284a.887.887 0 0 1 1.3 0l3.32 3.754c.441.5.052 1.246-.651 1.246H8.638c-.703 0-1.093-.746-.65-1.246zM12.607 18.716a.887.887 0 0 1-1.301 0l-3.318-3.754c-.442-.5-.053-1.246.65-1.246h6.637c.703 0 1.092.745.65 1.246z"
    />
  </svg>
);
export default SvgTxtArrow;
