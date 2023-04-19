import { useQuery } from "urql";
import { GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";

const AccountPage = () => {
  const [{ data, fetching }] = useQuery({ query: GQL_QUERY_ACTIVE_CUSTOMER });

  return (
    <PageLayout title="Moje konto" showTitle isLoading={fetching}></PageLayout>
  );
};

export default AccountPage;
