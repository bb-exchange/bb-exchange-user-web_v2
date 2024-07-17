import * as React from "react";
import { SVGProps } from "react";

const Circle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none" {...props}>
    <circle cx={15} cy={15} r={14.5} fill={props.fill} stroke="#F3F3F3" />
  </svg>
);
export default Circle;
