import * as React from "react";
import type { SVGProps } from "react";
const SvgThumbDownGreen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    className="thumb_down_green_svg"
    viewBox="0 0 28 28"
    {...props}
  >
    <path
      fill="#FFDDDB"
      d="M20.245 6.4v12.795a2.4 2.4 0 0 1-.466 1.41l-3.745 5.114c-.59.818-2.058 1.398-3.306.97-1.345-.416-2.237-1.801-1.948-3.035l.713-4.119a1.19 1.19 0 0 0-.288-.982 1.33 1.33 0 0 0-.947-.39H4.62c-1.084 0-2.017-.403-2.565-1.108-.522-.68-.618-1.562-.275-2.456l3.375-9.432C5.58 3.605 7.432 2.333 9.27 2.333h5.35c.92 0 2.21.29 2.8.831l1.755 1.247c.672.466 1.07 1.21 1.07 1.99"
    />
    <path
      fill="#10D66B"
      d="M21.263 20.3h1.259c1.894 0 2.664-.69 2.664-2.39V6.357c0-1.7-.77-2.39-2.664-2.39h-1.26c-1.894 0-2.664.69-2.664 2.39V17.91c0 1.7.77 2.389 2.665 2.389"
    />
  </svg>
);
export default SvgThumbDownGreen;
