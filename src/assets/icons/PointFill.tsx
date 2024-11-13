import * as React from "react";
import type { SVGProps } from "react";
const SvgPointFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    className="point_fill_svg"
    viewBox="0 0 16 16"
    {...props}
  >
    <circle cx={8} cy={7.996} r={6.5} fill="#F3F4FF" />
    <path
      fill="#676DFF"
      d="M8.344 3.989c1.88 0 3.346.646 3.346 2.677 0 1.95-1.465 2.827-3.3 2.827H7.248v3.035H5.54V3.989zm-.07 4.154c1.166 0 1.743-.496 1.743-1.477 0-1.004-.611-1.327-1.8-1.327h-.97v2.804z"
    />
  </svg>
);
export default SvgPointFill;
