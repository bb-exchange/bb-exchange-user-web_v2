import * as React from "react";
import type { SVGProps } from "react";
const SvgRefresh = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <circle cx={10} cy={10} r={7.5} fill="#fff" stroke="#B2BBC6" />
    <path
      fill="#B2BBC6"
      fillRule="evenodd"
      d="M10.018 6.949v-1.34c0-.215.26-.32.408-.167L12.25 7.26a.24.24 0 0 1 0 .34l-1.819 1.82a.243.243 0 0 1-.413-.173V7.91a2.88 2.88 0 0 0-2.813 3.5A2.86 2.86 0 0 0 9.4 13.601a2.887 2.887 0 0 0 3.47-2.405.48.48 0 0 1 .95.134 3.846 3.846 0 0 1-4.574 3.226 3.83 3.83 0 0 1-2.995-2.995 3.848 3.848 0 0 1 3.768-4.613"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgRefresh;
