import * as React from "react";
import type { SVGProps } from "react";
const SvgComment = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="comment_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#B2BBC6"
      fillRule="evenodd"
      d="M15.675 17.737A8.1 8.1 0 0 1 12 18.61c-4.142 0-7.5-3.047-7.5-6.804S7.858 5 12 5s7.5 3.046 7.5 6.804c0 1.829-.795 3.489-2.09 4.712l.306 2.008c.056.369-.363.619-.642.385zm2.8-.874c1.253-1.352 2.025-3.116 2.025-5.058C20.5 7.405 16.6 4 12 4s-8.5 3.404-8.5 7.804 3.9 7.804 8.5 7.804a9.1 9.1 0 0 0 3.518-.698l.913.765c1.065.892 2.452-.124 2.273-1.3z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComment;
