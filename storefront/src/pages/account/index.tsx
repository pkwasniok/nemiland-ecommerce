import { useQuery } from "urql";
import { GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { Heading } from "@chakra-ui/react";

const AccountPage = () => {
  const [activeCustomerQuery] = useQuery({
    query: GQL_QUERY_ACTIVE_CUSTOMER,
  });
  const activeCustomer = activeCustomerQuery.data?.activeCustomer ?? undefined;

  return (
    <PageLayout
      title="Moje konto"
      showTitle
      isLoading={activeCustomerQuery.fetching}
    >
      <Heading size="sm" textAlign="center">
        Cześć, {activeCustomer?.firstName}!
      </Heading>
    </PageLayout>
  );
};

export default AccountPage;
