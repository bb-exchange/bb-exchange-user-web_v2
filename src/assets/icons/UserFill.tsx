import * as React from "react";
import type { SVGProps } from "react";
const SvgUserFill = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g clipPath="url(#user_fill_svg__a)">
      <path
        fill="#233142"
        d="M1.25 12c0 5.93 4.82 10.75 10.75 10.75S22.75 17.93 22.75 12 17.93 1.25 12 1.25 1.25 6.07 1.25 12"
      />
      <path
        fill="#fff"
        d="M12.05 13.53h.1a4.014 4.014 0 0 0 3.89-4.02c0-2.22-1.81-4.03-4.03-4.03S7.98 7.29 7.98 9.51c0 2.18 1.7 3.95 3.97 4.02z"
      />
      <path
        fill="#676DFF"
        d="M4.75 19.93A10.7 10.7 0 0 0 12 22.75c2.69 0 5.26-1 7.25-2.82.18-.16.27-.39.24-.63-.13-1.19-.87-2.29-2.1-3.12-2.97-1.98-7.8-1.98-10.78 0-1.23.82-1.97 1.93-2.1 3.12-.02.23.06.47.24.63"
      />
    </g>
    <defs>
      <clipPath id="user_fill_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgUserFill;
