import * as React from "react";
import type { SVGProps } from "react";
const SvgShop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="shop_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeWidth={1.8}
      d="M20.485 3h-3.992l.5 5s1 1 2.5 1a3.23 3.23 0 0 0 2.139-.806.5.5 0 0 0 .15-.465L21.076 3.5a.6.6 0 0 0-.591-.5Z"
    />
    <path stroke="#233142" strokeWidth={1.8} d="m16.493 3 .5 5s-1 1-2.5 1-2.5-1-2.5-1V3z" />
    <path stroke="#233142" strokeWidth={1.8} d="M11.993 3v5s-1 1-2.5 1-2.5-1-2.5-1l.5-5z" />
    <path
      stroke="#233142"
      strokeWidth={1.8}
      d="M7.493 3H3.502a.6.6 0 0 0-.592.501L2.205 7.73a.5.5 0 0 0 .15.465c.328.29 1.061.806 2.138.806 1.5 0 2.5-1 2.5-1l.5-5z"
    />
    <path stroke="#233142" strokeWidth={1.8} d="M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9" />
    <path
      stroke="#233142"
      strokeMiterlimit={16}
      strokeWidth={1.8}
      d="M14.833 21v-6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v6"
    />
  </svg>
);
export default SvgShop;
