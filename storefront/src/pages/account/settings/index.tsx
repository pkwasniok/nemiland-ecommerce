import { useQuery } from "@apollo/client";
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
  const { data: activeCustomerData, loading } = useQuery(
    GQL_QUERY_ACTIVE_CUSTOMER
  );
  const activeCustomer = activeCustomerData?.activeCustomer ?? undefined;

  if (activeCustomer == undefined) {
    return <div></div>;
  }

  return (
    <PageLayout
      title="Ustawienia konta"
      backlinkHref="/account"
      showTitle
      isLoading={loading}
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
