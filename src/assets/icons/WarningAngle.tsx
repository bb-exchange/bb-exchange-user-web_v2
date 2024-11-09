import * as React from "react";
import type { SVGProps } from "react";
const SvgWarningAngle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} fill="none" {...props}>
    <path
      fill="#676DFF"
      fillRule="evenodd"
      d="M32.255 6.04a11.5 11.5 0 0 0-12.305 5.69L4.485 39.566a10.8 10.8 0 0 0-1.36 5.25c0 5.97 4.84 10.81 10.81 10.81h32.13c5.97 0 10.81-4.84 10.81-10.81a10.8 10.8 0 0 0-1.36-5.25L40.05 11.73a11.5 11.5 0 0 0-7.795-5.69"
      clipRule="evenodd"
      opacity={0.3}
    />
    <path
      stroke="#676DFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.75}
      d="M30 22.5v10M30 40v1.25"
    />
  </svg>
);
export default SvgWarningAngle;
