import * as React from "react";

import "./text.css";
import { Slot } from "@radix-ui/react-slot";
import cn from "classnames";

interface TextProps {
  as?:
    | "span"
    | "div"
    | "label"
    | "p"
    | "h1"
    | "h2"
    | "h3"
    | "code"
    | "strong"
    | "em"
    | "blockquote";
  variant?:
    | "display1"
    | "display2"
    | "headline1"
    | "title1"
    | "title2"
    | "body1_normal"
    | "body1_reading"
    | "body2_normal"
    | "body2_reading"
    | "label1_normal"
    | "label1_reading"
    | "caption1"
    | "caption2";
  weight?: "bold" | "medium" | "regular";
  asChild?: boolean;
  color?: string;
  className?: string;
  children: React.ReactNode;
}

const weightToFontWeight: Record<"bold" | "medium" | "regular", number> = {
  bold: 700,
  medium: 500,
  regular: 400,
};

const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      asChild = false,
      variant = "body1_normal",
      weight = "medium",
      as: Tag = "span",
      color,
      className,
      children,
    },
    ref,
  ) => {
    const componentClassNames = cn("rt-Text", `bb-${variant}`, className);
    const fontWeight: number = weightToFontWeight[weight];

    return (
      <Slot
        ref={ref}
        className={componentClassNames}
        style={{ color, fontWeight }}
        data-accent-color={color}
      >
        {asChild ? children : <Tag>{children}</Tag>}
      </Slot>
    );
  },
);

Text.displayName = "Text";

export { Text };
export type { TextProps };
