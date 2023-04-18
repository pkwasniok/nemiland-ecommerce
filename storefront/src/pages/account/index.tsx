import { useQuery } from "urql";
import {
  gql,
  GQL_QUERY_ACTIVE_CUSTOMER,
  GQL_QUERY_ACTIVE_CHANNEL,
} from "@/lib/vendure";

const TEST = gql(`
  query Test {
    activeCustomer {
      id
    }
  }
`);

import { PageLayout } from "@/features/layout";
import { Flex, Heading, Text } from "@chakra-ui/react";

const AccountPage = () => {
  const [{ data }] = useQuery({ query: GQL_QUERY_ACTIVE_CHANNEL });

  return (
    <PageLayout title="Moje konto" showTitle isLoading={loading}>
      <Flex direction="column" gap={1}>
        <Heading size="sm" textAlign="center">
          Cześć, {data.activeCustomer.firstName}
        </Heading>
        <Text fontSize="sm" textAlign="center">
          W czym możemy pomóc?
        </Text>
      </Flex>
    </PageLayout>
  );
};

export default AccountPage;
