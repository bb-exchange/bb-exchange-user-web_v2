import * as React from "react";
import type { SVGProps } from "react";
const SvgTxtRightalign = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="txt_rightalign_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 6.6h13M9 12.23h10M4 18h15"
    />
  </svg>
);
export default SvgTxtRightalign;
