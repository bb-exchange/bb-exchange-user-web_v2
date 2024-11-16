import * as React from "react";
import type { SVGProps } from "react";
const SvgTxtColor = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="txt_color_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m7 19 5-12 5 12M9 15h6"
    />
    <circle cx={17.5} cy={5.5} r={1.5} fill="#233142" />
  </svg>
);
export default SvgTxtColor;
