import { useState } from "react";
import client from "@/lib/client";
import { useMeCustomer } from "medusa-react";

import { PageLayout } from "@/features/layout";
import {
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
} from "@chakra-ui/react";
import { CustomerUpdateForm, CustomerUpdateFormValues } from "@/features/forms";

const SettingsPage = () => {
  const toast = useToast();

  const [isUpdateLoading, setUpdateLoading] = useState(false);
  const { customer, isLoading } = useMeCustomer();

  const handleCustomerUpdate = async (values: CustomerUpdateFormValues) => {
    setUpdateLoading(true);

    await client.customers
      .update({
        first_name: values.firstName,
        last_name: values.lastName,
      })
      .then(() => {
        toast({
          title: "Zapisano",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Coś poszło nie tak...",
          description: "Spróbuj ponownie później",
          status: "error",
        });
      });

    setUpdateLoading(false);
  };

  return (
    <PageLayout
      title="Ustawienia konta"
      backlinkHref="/account"
      showTitle
      isLoading={isLoading}
    >
      <Accordion defaultIndex={0}>
        <AccordionItem>
          <AccordionButton>
            <Flex flex={1}>Twoje dane</Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>
            <CustomerUpdateForm
              initialValues={{
                firstName: customer?.first_name ?? "",
                lastName: customer?.last_name ?? "",
              }}
              isLoading={isUpdateLoading}
              onSubmit={handleCustomerUpdate}
            />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Flex flex={1}>Zmiana hasła</Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel>
            <CustomerUpdateForm
              initialValues={{
                firstName: customer?.first_name ?? "",
                lastName: customer?.last_name ?? "",
              }}
              isLoading={isUpdateLoading}
              onSubmit={handleCustomerUpdate}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </PageLayout>
  );
};

export default SettingsPage;
