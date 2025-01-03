"use client";

import { toast } from "sonner";

import { iconMap } from "@/assets/icons";

import { Box, Flex, Grid, Section } from "@/shared/components/layouts";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Switch } from "@/shared/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Text } from "@/shared/components/ui/text";
import { Toaster } from "@/shared/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

export default function Home() {
  const test = [
    "display1",
    "display2",
    "headline1",
    "title1",
    "title2",
    "body1_normal",
    "body1_reading",
    "body2_normal",
    "body2_reading",
    "label1_normal",
    "label1_reading",
    "caption1",
    "caption2",
  ];
  const badges = ["grey", "blue", "main", "red", "green"];
  return (
    <Section>
      <Flex direction="column">
        {badges.map((badge) => {
          return (
            <Box key={badge}>
              <Badge color={badge} size="lg">
                {/* {badge}, lg */}
                태그
              </Badge>
              <Badge color={badge} size="md">
                {/* {badge}, md */}
                태그
              </Badge>
            </Box>
          );
        })}
      </Flex>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover</TooltipTrigger>
          <TooltipContent align="center">
            판매 대금 확정 여부에 따라 ‘수익금’과
            <br /> ‘출금 가능 수익금’에 차이가 있을 수 있어요.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Switch />
      <Avatar size="sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Toaster />

      <Box>
        <TooltipProvider delayDuration={100}>
          {iconMap.map((map, index) => {
            if (map.name === "Divider") {
              return <br key={index} />;
            } else {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <map.comp key={index} />
                  </TooltipTrigger>
                  <TooltipContent align="center">{map.name}</TooltipContent>
                </Tooltip>
              );
            }
          })}
        </TooltipProvider>
      </Box>

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
            <Flex direction="column">
              {test.map((t: any) => {
                return (
                  <Flex direction="column" key={t} style={{ border: "3px solid pink" }}>
                    <Text variant={t} weight="bold">
                      스포카 한 산스 네오 ({t} / bold)
                    </Text>
                    <Text variant={t} weight="medium">
                      스포카 한 산스 네오 ({t} / medium)
                    </Text>
                    <Text variant={t} weight="regular">
                      스포카 한 산스 네오 ({t} / regular)
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          </TabsContent>

          <TabsContent value="documents">
            <Text>Access and update your documents.</Text>
          </TabsContent>

          <TabsContent value="settings">
            <Text>Edit your profile or update contact information.</Text>
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
