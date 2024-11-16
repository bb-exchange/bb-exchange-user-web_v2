import * as React from "react";
import type { SVGProps } from "react";
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="plus_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#233142"
      stroke="#233142"
      d="M18 12.25H6a.256.256 0 0 1-.25-.25c0-.134.116-.25.25-.25h12c.134 0 .25.116.25.25s-.116.25-.25.25Z"
    />
    <path
      fill="#233142"
      stroke="#233142"
      d="M12 18.25a.256.256 0 0 1-.25-.25V6c0-.134.116-.25.25-.25s.25.116.25.25v12c0 .134-.116.25-.25.25Z"
    />
  </svg>
);
export default SvgPlus;
