import * as React from "react";
import type { SVGProps } from "react";
const SvgLevelSilver = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#B2BBC6"
      d="m12 3.101 6.23 2.67L20.899 12l-2.67 6.23L12 20.899l-6.23-2.67L3.101 12l2.67-6.23z"
    />
    <mask
      id="level_silver_svg__a"
      width={18}
      height={18}
      x={3}
      y={3}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <path
        fill="#B2BBC6"
        d="m12 3.101 6.23 2.67L20.899 12l-2.67 6.23L12 20.899l-6.23-2.67L3.101 12l2.67-6.23z"
      />
    </mask>
    <g mask="url(#level_silver_svg__a)">
      <path fill="#fff" d="m12.494 12 5.933-6.427L12 2.607 5.079 5.079 2.607 12z" opacity={0.25} />
    </g>
    <path
      fill="#fff"
      d="M11.76 7.54a.267.267 0 0 1 .479 0l1.152 2.334a.27.27 0 0 0 .2.146l2.576.375c.219.031.306.3.148.455l-1.864 1.816a.27.27 0 0 0-.077.236l.44 2.565a.267.267 0 0 1-.386.281l-2.304-1.21a.27.27 0 0 0-.248 0l-2.304 1.21a.267.267 0 0 1-.387-.28l.44-2.566a.27.27 0 0 0-.076-.236L7.685 10.85a.267.267 0 0 1 .148-.455l2.575-.375a.27.27 0 0 0 .201-.146z"
    />
  </svg>
);
export default SvgLevelSilver;
