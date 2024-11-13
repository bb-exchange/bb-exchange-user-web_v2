import * as React from "react";
import type { SVGProps } from "react";
const SvgQuestion = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="question_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="#233142">
      <path
        fillRule="evenodd"
        d="M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17m0 1.5c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M10.794 8.217c-.252.214-.444.544-.444 1.057a.85.85 0 1 1-1.7 0c0-1.003.404-1.81 1.045-2.354.622-.528 1.42-.77 2.187-.77s1.566.242 2.188.77c.64.544 1.044 1.351 1.044 2.354 0 1.203-.8 2.152-1.403 2.713a8 8 0 0 1-.861.688V14a.85.85 0 1 1-1.7 0v-1.79c0-.306.165-.59.431-.74l.002-.001.012-.007.057-.034c.051-.032.128-.08.221-.145.189-.129.436-.314.68-.541.529-.492.861-1.01.861-1.468 0-.513-.191-.843-.444-1.057-.271-.23-.663-.367-1.088-.367s-.816.137-1.088.367"
        clipRule="evenodd"
      />
      <rect width={2} height={2} x={11} y={16} rx={1} />
    </g>
  </svg>
);
export default SvgQuestion;
