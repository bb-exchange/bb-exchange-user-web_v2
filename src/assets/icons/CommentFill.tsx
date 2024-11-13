import * as React from "react";
import type { SVGProps } from "react";
const SvgCommentFill = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="comment_fill_svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#676DFF"
      fillRule="evenodd"
      d="M17.44 16.713c1.446-1.263 2.343-3.029 2.343-4.982 0-3.842-3.47-6.956-7.75-6.956s-7.75 3.114-7.75 6.956c0 3.841 3.47 6.955 7.75 6.955a8.4 8.4 0 0 0 3.745-.864l1.296 1.086c.28.234.698-.016.642-.384z"
      clipRule="evenodd"
    />
    <path
      fill="#676DFF"
      fillRule="evenodd"
      d="M15.675 17.729A8.1 8.1 0 0 1 12 18.6c-4.142 0-7.5-3.046-7.5-6.804 0-3.757 3.358-6.803 7.5-6.803s7.5 3.046 7.5 6.803c0 1.83-.795 3.49-2.09 4.712l.306 2.009c.056.368-.363.619-.642.384zm2.8-.875c1.253-1.352 2.025-3.116 2.025-5.058 0-4.399-3.9-7.803-8.5-7.803s-8.5 3.404-8.5 7.803c0 4.4 3.9 7.804 8.5 7.804a9.1 9.1 0 0 0 3.518-.697l.913.765c1.065.892 2.452-.124 2.273-1.301z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgCommentFill;
