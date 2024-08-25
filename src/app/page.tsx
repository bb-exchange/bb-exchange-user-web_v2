"use client";

import { toast } from "sonner";

import { Flex, Grid, Section } from "@/shared/components/layouts";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Toaster } from "@/shared/components/ui/toast";

export default function Home() {
  return (
    <Section>
      <Toaster />

      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            position: "top-center",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
      <Flex direction="column" gap="2">
        <Flex>
          <Skeleton height="60px" width="100%">
            tab
          </Skeleton>
        </Flex>
        <Grid columns="3" gap="4">
          <Skeleton height="160px"></Skeleton>
          <Skeleton height="160px"></Skeleton>
          <Skeleton height="160px"></Skeleton>
          <Skeleton height="160px"></Skeleton>
          <Skeleton height="160px"></Skeleton>
          <Skeleton height="160px"></Skeleton>
          <Skeleton height="160px"></Skeleton>
          <Skeleton height="160px"></Skeleton>
          <Skeleton height="160px"></Skeleton>
        </Grid>
      </Flex>
    </Section>
  );
}
