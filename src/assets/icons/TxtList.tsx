import * as React from "react";
import type { SVGProps } from "react";
const SvgTxtList = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="txt_list_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.212 6.603h11.25M4.463 6.612l.009-.01M4.463 12.237l.009-.01M4.463 17.81l.009-.01M8.212 12.228h11.25M8.213 17.8h11.25"
    />
  </svg>
);
export default SvgTxtList;
