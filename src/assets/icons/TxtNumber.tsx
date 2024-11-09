import * as React from "react";
import type { SVGProps } from "react";
const SvgTxtNumber = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.188 6.375H19.5M5.437 8.25V4.5l-.9.54M6.375 13.875H5.063a.56.56 0 0 1-.563-.562v-.75c0-.311.252-.563.563-.563h.75c.31 0 .562-.252.562-.562v-.75a.56.56 0 0 0-.562-.563H4.5M4.5 15.75h1.313c.31 0 .562.252.562.563v2.625c0 .31-.252.562-.562.562H4.5M6.375 17.625H4.5M9.188 12H19.5M9.188 17.625H19.5"
    />
  </svg>
);
export default SvgTxtNumber;
