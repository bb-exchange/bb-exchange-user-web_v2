"use client";

import { toast } from "sonner";

import { Box, Flex, Grid, Section } from "@/shared/components/layouts";
import { Text } from "@/shared/components/typography";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
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

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">비법글</TabsTrigger>
          <TabsTrigger value="documents">크리에이터</TabsTrigger>
          <TabsTrigger value="settings">abcd</TabsTrigger>
        </TabsList>

        <Box pt="3">
          <TabsContent value="account">
            <Text size="2">Make changes to your account.</Text>
          </TabsContent>

          <TabsContent value="documents">
            <Text size="2">Access and update your documents.</Text>
          </TabsContent>

          <TabsContent value="settings">
            <Text size="2">Edit your profile or update contact information.</Text>
          </TabsContent>
        </Box>
      </Tabs>

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
