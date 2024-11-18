import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    className="arrow_down_svg"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#233142"
      d="M13.558 6.103a.5.5 0 0 1-.146.354l-4.347 4.346a1.827 1.827 0 0 1-2.573 0L2.145 6.457a.503.503 0 0 1 0-.707.503.503 0 0 1 .707 0l4.346 4.347c.32.32.84.32 1.16 0l4.347-4.347a.503.503 0 0 1 .707 0c.093.1.146.227.146.353"
    />
  </svg>
);
export default SvgArrowDown;
