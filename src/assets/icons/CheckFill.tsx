import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckFill = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <g clipPath="url(#check_fill_svg__a)">
      <circle cx={10} cy={10} r={8.333} fill="#676DFF" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M14.17 7.454a.625.625 0 0 1 .042.883l-3.872 4.26c-.4.44-1.087.457-1.508.036l-2.607-2.608a.625.625 0 0 1 .884-.884l2.453 2.454 3.726-4.099a.625.625 0 0 1 .882-.042"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="check_fill_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCheckFill;
