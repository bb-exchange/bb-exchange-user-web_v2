import * as React from "react";
import type { SVGProps } from "react";
const SvgStarFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="star_fill_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#676DFF"
      d="M10.706 4.694c.49-1.29 2.315-1.29 2.805 0l1.54 4.057 4.187.164c1.383.054 1.96 1.792.886 2.664l-3.453 2.8 1.246 3.836c.444 1.366-1.101 2.515-2.282 1.695l-3.527-2.448-3.527 2.448c-1.18.82-2.726-.329-2.282-1.695l1.246-3.836-3.453-2.8c-1.074-.872-.496-2.61.887-2.664l4.187-.164z"
    />
  </svg>
);
export default SvgStarFill;
