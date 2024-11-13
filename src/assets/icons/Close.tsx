import * as React from "react";
import type { SVGProps } from "react";
const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    className="close_svg"
    viewBox="0 0 20 20"
    {...props}
  >
    <path stroke="#233142" strokeLinecap="round" strokeLinejoin="round" d="M15 5 5 15M5 5l10 10" />
  </svg>
);
export default SvgClose;
