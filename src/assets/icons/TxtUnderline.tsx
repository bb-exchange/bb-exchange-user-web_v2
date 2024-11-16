import * as React from "react";
import type { SVGProps } from "react";
const SvgTxtUnderline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="txt_underline_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 19h10M16.55 5.5v5.95A4.55 4.55 0 0 1 12 16v0a4.55 4.55 0 0 1-4.55-4.55V5.5"
    />
  </svg>
);
export default SvgTxtUnderline;
