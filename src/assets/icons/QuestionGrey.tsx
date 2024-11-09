import * as React from "react";
import type { SVGProps } from "react";
const SvgQuestionGrey = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <g clipPath="url(#question_grey_svg__a)">
      <path
        fill="#B2BBC6"
        fillRule="evenodd"
        d="M12.004 22.001c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M10.793 8.216c-.253.214-.445.544-.445 1.057a.85.85 0 1 1-1.7 0c0-1.002.404-1.81 1.045-2.353.622-.528 1.421-.77 2.188-.77.766 0 1.565.242 2.187.77.64.543 1.045 1.35 1.045 2.353 0 1.203-.8 2.152-1.404 2.713a8 8 0 0 1-.86.688V14a.85.85 0 1 1-1.7 0v-1.79c0-.306.164-.589.43-.74h.002l.012-.008.057-.034q.08-.048.222-.144c.188-.13.436-.315.68-.542.529-.491.86-1.01.86-1.468 0-.513-.19-.843-.444-1.057-.27-.23-.663-.367-1.087-.367-.425 0-.817.137-1.088.367"
        clipRule="evenodd"
      />
      <rect width={2} height={2} x={11.004} y={15.999} fill="#fff" rx={1} />
    </g>
    <defs>
      <clipPath id="question_grey_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgQuestionGrey;
