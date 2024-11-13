import * as React from "react";
import type { SVGProps } from "react";
const SvgTxtQuotes = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="txt_quotes_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#233142"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M10.493 12.163H5.679a.963.963 0 0 1-.963-.963V7.83c0-.532.431-.963.963-.963H9.53c.532 0 .963.431.963.963zm0 0c0 2.406-.963 3.85-3.851 5.295M19.12 12.163h-4.813a.963.963 0 0 1-.963-.963V7.83c0-.532.431-.963.963-.963h3.85c.532 0 .964.431.964.963zm0 0c0 2.406-.962 3.85-3.85 5.295"
    />
    <path fill="#233142" d="M5 6.75h5v5H5zM14 6.75h5v5h-5z" />
  </svg>
);
export default SvgTxtQuotes;
