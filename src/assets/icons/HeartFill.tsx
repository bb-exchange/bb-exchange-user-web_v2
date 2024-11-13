import * as React from "react";
import type { SVGProps } from "react";
const SvgHeartFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    className="heart_fill_svg"
    viewBox="0 0 20 20"
    {...props}
  >
    <circle cx={10.002} cy={9.995} r={8.125} fill="#FFDDDB" />
    <path
      fill="#F1351C"
      d="M10.002 14.47a.9.9 0 0 1-.596-.232q-.57-.496-1.043-.894c-.943-.81-1.771-1.49-2.35-2.185-.68-.828-1.01-1.606-1.01-2.484 0-.844.297-1.639.827-2.218a2.86 2.86 0 0 1 2.12-.927c.612 0 1.192.198 1.688.58.133.099.249.198.364.33.116-.116.232-.231.365-.33.496-.382 1.06-.58 1.688-.58a2.83 2.83 0 0 1 2.12.927c.546.58.827 1.374.827 2.218 0 .878-.314 1.656-1.01 2.484-.579.695-1.407 1.39-2.35 2.185-.315.265-.68.58-1.06.894a.83.83 0 0 1-.58.232"
    />
  </svg>
);
export default SvgHeartFill;
