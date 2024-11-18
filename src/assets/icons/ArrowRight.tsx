import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    className="arrow_right_svg"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#233142"
      stroke="#233142"
      d="M5.43 2.72q.018 0 .028.005a.1.1 0 0 1 .017.01l4.723 4.347c.553.509.553 1.33 0 1.838l-4.723 4.347c-.004.003-.019.013-.046.013l-.024-.003 4.702-4.328a1.275 1.275 0 0 0 0-1.896L5.405 2.725a.1.1 0 0 1 .024-.005Z"
    />
  </svg>
);
export default SvgArrowRight;
