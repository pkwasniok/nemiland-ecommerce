import { useQuery } from "urql";
import { GQL_QUERY_ACTIVE_CUSTOMER } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { UpdateCustomerWidget } from "@/features/account";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const SettingsPage = () => {
  const [{ data, fetching }] = useQuery({ query: GQL_QUERY_ACTIVE_CUSTOMER });
  const activeCustomer = data?.activeCustomer ?? undefined;

  if (activeCustomer == undefined) {
    return <div></div>;
  }

  return (
    <PageLayout
      title="Ustawienia konta"
      backlinkHref="/account"
      showTitle
      isLoading={fetching}
    >
      <Accordion defaultIndex={0}>
        <AccordionItem>
          <AccordionButton justifyContent="space-between">
            Moje dane <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <UpdateCustomerWidget />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </PageLayout>
  );
};

export default SettingsPage;
