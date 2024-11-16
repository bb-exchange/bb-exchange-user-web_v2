import * as React from "react";
import type { SVGProps } from "react";
const SvgLink = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="link_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.478 12.866a2 2 0 0 1-2.732.732l-3.464-2a2 2 0 0 1-.732-2.732l1-1.732a2 2 0 0 1 2.732-.732l3.464 2a2 2 0 0 1 .732 2.732zM18.406 16.866a2 2 0 0 1-2.732.732l-3.464-2a2 2 0 0 1-.732-2.732l1-1.732a2 2 0 0 1 2.732-.732l1.732 1 1.732 1a2 2 0 0 1 .732 2.732zM9.933 10.82l4.043 2.438"
    />
  </svg>
);
export default SvgLink;
