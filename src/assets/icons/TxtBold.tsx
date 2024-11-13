import * as React from "react";
import type { SVGProps } from "react";
const SvgTxtBold = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="txt_bold_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 5h5.5A3.5 3.5 0 0 1 16 8.5v0a3.5 3.5 0 0 1-3.5 3.5H7zM7 12h6.5a3.5 3.5 0 0 1 3.5 3.5v0a3.5 3.5 0 0 1-3.5 3.5H7z"
    />
  </svg>
);
export default SvgTxtBold;
