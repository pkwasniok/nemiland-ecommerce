import { useRouter } from "next/router";

import { PageLayout } from "@/features/layout";
import {
  RequestVerificationForm,
  RequestVerificationFormValues,
} from "@/features/form";
import { useToast } from "@chakra-ui/react";

const VerificationPage = () => {
  const router = useRouter();
  const toast = useToast();

  const handleRequestVerification = (
    values: RequestVerificationFormValues
  ) => {};

  return (
    <PageLayout title="Weryfikacja konta" backlinkHref="/login" showTitle>
      <RequestVerificationForm
        initialValues={{ email: "" }}
        onSubmit={handleRequestVerification}
      />
    </PageLayout>
  );
};

export default VerificationPage;
