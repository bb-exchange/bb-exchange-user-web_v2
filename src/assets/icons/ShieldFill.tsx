import * as React from "react";
import type { SVGProps } from "react";
const SvgShieldFill = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={82} height={96} fill="none" {...props}>
    <g filter="url(#shield_fill_svg__a)" opacity={0.3}>
      <path
        fill="#676DFF"
        d="M13.667 31.029c0-1.241.673-2.384 1.758-2.987L39.34 14.755a3.42 3.42 0 0 1 3.319 0l23.917 13.287a3.42 3.42 0 0 1 1.757 2.987v15.848A34.17 34.17 0 0 1 50.76 76.746l-8.1 4.5a3.42 3.42 0 0 1-3.319 0l-8.1-4.5a34.17 34.17 0 0 1-17.574-29.868z"
      />
    </g>
    <path
      stroke="#676DFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={5.125}
      d="m32.459 48 6.833 6.833L52.96 41.167"
    />
    <defs>
      <filter
        id="shield_fill_svg__a"
        width={82}
        height={94.683}
        x={0.001}
        y={0.658}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation={3.417} />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_3454_927" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={6.833} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.1 0" />
        <feBlend in2="effect1_backgroundBlur_3454_927" result="effect2_dropShadow_3454_927" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_3454_927" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={5.125} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.231373 0 0 0 0 0.407843 0 0 0 0 1 0 0 0 0.38 0" />
        <feBlend in2="shape" result="effect3_innerShadow_3454_927" />
      </filter>
    </defs>
  </svg>
);
export default SvgShieldFill;
