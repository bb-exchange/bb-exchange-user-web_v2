import { Flex, Grid } from "@/shared/components/layouts";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function Home() {
  return (
    <section>
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
    </section>
  );
}
