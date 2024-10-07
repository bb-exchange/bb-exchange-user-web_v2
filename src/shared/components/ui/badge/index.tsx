"use client";

import * as React from "react";

import "./badge.scss";
import { Slot } from "@radix-ui/react-slot";
import cn from "classnames";

interface BadgeProps extends React.ComponentPropsWithoutRef<"span"> {
  asChild?: boolean;
  size?: "lg" | "md";
}

// TODO: icon 추가해서 테스트 하기
const Badge = React.forwardRef<React.ElementRef<"span">, BadgeProps>((props, ref) => {
  const { asChild, className, color, size = "md", ...badgeProps } = props;

  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-accent-color={color}
      {...badgeProps}
      ref={ref}
      className={cn(
        "rt-reset",
        "bb-badge",
        `bb-badge-color-${color}`,
        `bb-badge-size-${size}`,
        { "bb-label1_normal": size === "lg" },
        { "bb-caption1": size === "md" },

        className,
      )}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps };
