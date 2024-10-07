import { Box, Container, Flex, Grid, Section } from "@/shared/components/layouts";

type ArticleIdParams = {
  id: string;
};
export default function ({ params }: { params: ArticleIdParams }) {
  return (
    <Grid columns="1fr 380px">
      <Flex direction="column" style={{ border: "1px solid brown" }}>
        article ID : {params.id}
      </Flex>
      <Flex direction="column" gap="7" style={{ border: "1px solid lightblue" }}>
        <Box style={{ border: "3px solid red" }}>2-1</Box>
        <Box style={{ border: "3px solid yellow" }}>2-2</Box>
        <Box style={{ border: "3px solid green" }}>2-3</Box>
      </Flex>
    </Grid>
  );
}
