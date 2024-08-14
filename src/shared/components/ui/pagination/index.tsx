import * as React from "react";

import { IconButtonProps } from "@radix-ui/themes";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

import { Flex } from "@/shared/components/layouts";
import { IconButton } from "@/shared/components/ui/icon-button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <Flex asChild justify="center" mt="6">
    <nav role="navigation" aria-label="pagination" {...props} />
  </Flex>
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <Flex asChild align="center" gap="1">
      <ul ref={ref} {...props} />
    </Flex>
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} {...props} />,
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & IconButtonProps;

const PaginationLink = ({ className, isActive, disabled, ...props }: PaginationLinkProps) => (
  <IconButton
    color="gray"
    variant={isActive ? "solid" : "soft"}
    highContrast
    disabled={disabled}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" {...props}>
    <ChevronLeft />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" {...props}>
    <ChevronRight />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationPreviousPage = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to previous page" {...props}>
    <ChevronsLeft />
  </PaginationLink>
);
PaginationPreviousPage.displayName = "PaginationPreviousPage";

const PaginationNextPage = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to next page" {...props}>
    <ChevronsRight />
  </PaginationLink>
);
PaginationNextPage.displayName = "PaginationNextPage";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <Flex asChild align="center" justify="center">
    <span aria-hidden {...props}>
      <MoreHorizontal className="h-4 w-4" />
    </span>
  </Flex>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationPreviousPage,
  PaginationNextPage,
};
