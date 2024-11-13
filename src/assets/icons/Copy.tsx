import * as React from "react";
import type { SVGProps } from "react";
const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    className="copy_svg"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.8 9.8h-.6A1.2 1.2 0 0 1 2 8.6V3.2A1.2 1.2 0 0 1 3.2 2h5.4a1.2 1.2 0 0 1 1.2 1.2v.6M7.4 6.2h5.4A1.2 1.2 0 0 1 14 7.4v5.4a1.2 1.2 0 0 1-1.2 1.2H7.4a1.2 1.2 0 0 1-1.2-1.2V7.4a1.2 1.2 0 0 1 1.2-1.2"
    />
  </svg>
);
export default SvgCopy;
