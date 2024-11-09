import * as React from "react";
import type { SVGProps } from "react";
const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <g fill="#233142" fillRule="evenodd" clipPath="url(#check_svg__a)" clipRule="evenodd">
      <path d="M10 17.083a7.083 7.083 0 1 0 0-14.167 7.083 7.083 0 0 0 0 14.167m0 1.25a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666" />
      <path d="M14.17 7.454a.625.625 0 0 1 .043.883l-3.873 4.26c-.4.44-1.087.457-1.508.036l-2.607-2.608a.625.625 0 1 1 .884-.884l2.453 2.454 3.726-4.099a.625.625 0 0 1 .882-.042" />
    </g>
    <defs>
      <clipPath id="check_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCheck;
