import * as React from "react";
import type { SVGProps } from "react";
const SvgShieldFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={70}
    fill="none"
    className="shield_fill_svg"
    viewBox="0 0 56 70"
    {...props}
  >
    <path
      fill="#9095FF"
      d="M.667 18.029c0-1.241.673-2.384 1.758-2.987L26.34 1.755a3.42 3.42 0 0 1 3.319 0l23.917 13.287a3.42 3.42 0 0 1 1.757 2.987v15.848A34.17 34.17 0 0 1 37.76 63.745l-8.1 4.5a3.42 3.42 0 0 1-3.319 0l-8.1-4.5A34.17 34.17 0 0 1 .667 33.878z"
      opacity={0.3}
    />
    <path
      stroke="#676DFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={5.125}
      d="m19.459 35 6.833 6.833L39.96 28.167"
    />
  </svg>
);
export default SvgShieldFill;
