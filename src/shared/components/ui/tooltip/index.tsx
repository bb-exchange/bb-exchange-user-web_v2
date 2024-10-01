"use client";

import * as React from "react";

import "./tooltip.scss";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import cn from "classnames";

import { Text } from "@/shared/components/ui/text";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn("tooltip-content", className)}
    {...props}
  >
    <Text variant="caption1" weight="regular">
      {props.children}
    </Text>
    <TooltipPrimitive.Arrow className="tooltip-arrow" />
  </TooltipPrimitive.Content>
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
