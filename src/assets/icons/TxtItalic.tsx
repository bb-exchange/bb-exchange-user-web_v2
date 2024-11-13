import * as React from "react";
import type { SVGProps } from "react";
const SvgTxtItalic = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="txt_italic_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 5h6M8 18h6M13 5.5l-1.938 12.3"
    />
  </svg>
);
export default SvgTxtItalic;
