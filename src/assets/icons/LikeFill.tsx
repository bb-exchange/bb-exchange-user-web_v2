import * as React from "react";
import type { SVGProps } from "react";
const SvgLikeFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="like_fill_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#FA4F38"
      d="M12 21.44c-.43 0-.86-.165-1.192-.463a175 175 0 0 0-2.086-1.788c-1.888-1.623-3.543-2.98-4.702-4.371C2.662 13.162 2 11.606 2 9.85c0-1.689.596-3.278 1.656-4.437A5.71 5.71 0 0 1 7.894 3.56c1.225 0 2.384.397 3.377 1.159.265.198.497.397.729.662.232-.232.464-.464.729-.662.993-.762 2.119-1.16 3.377-1.16a5.66 5.66 0 0 1 4.238 1.855C21.437 6.573 22 8.162 22 9.85c0 1.755-.63 3.311-2.02 4.967-1.159 1.39-2.814 2.781-4.702 4.37-.629.53-1.357 1.16-2.12 1.789A1.65 1.65 0 0 1 12 21.44"
    />
  </svg>
);
export default SvgLikeFill;
