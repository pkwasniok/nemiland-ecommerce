import { PageLayout } from "@/features/layout";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Flex,
} from "@chakra-ui/react";

const SettingsPage = () => {
  return (
    <PageLayout
      title="Ustawienia konta"
      backlinkHref="/account"
      showTitle
    ></PageLayout>
  );
};

export default SettingsPage;
