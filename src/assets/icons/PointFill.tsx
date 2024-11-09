import * as React from "react";
import type { SVGProps } from "react";
const SvgPointFill = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <circle cx={12} cy={11.994} r={9.75} fill="#F3F4FF" />
    <path
      fill="#676DFF"
      d="M12.516 5.984c2.821 0 5.02.969 5.02 4.015 0 2.925-2.199 4.24-4.95 4.24H10.87v4.553H8.31V5.984zm-.104 6.23c1.748 0 2.614-.744 2.614-2.215 0-1.506-.918-1.99-2.7-1.99H10.87v4.206z"
    />
  </svg>
);
export default SvgPointFill;
