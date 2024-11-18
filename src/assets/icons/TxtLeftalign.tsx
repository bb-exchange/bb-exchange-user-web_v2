import * as React from "react";
import type { SVGProps } from "react";
const SvgTxtLeftalign = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="txt_leftalign_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.5 6.6h13M4.5 12.23h10M4.5 17.8h15"
    />
  </svg>
);
export default SvgTxtLeftalign;
