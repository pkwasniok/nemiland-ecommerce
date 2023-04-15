import { PageLayout } from "@/features/layout";
import { Flex, Heading, Text } from "@chakra-ui/react";

const NotFoundPage = () => {
  return (
    <PageLayout title="Nie znaleziono">
      <Flex
        flex={1}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>404</Heading>
        <Text>Strona, której szukasz nie została znaleziona (sadge)</Text>
      </Flex>
    </PageLayout>
  );
};

export default NotFoundPage;
