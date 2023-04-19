import { useRouter } from "next/router";

import { PageLayout } from "@/features/layout";
import {
  RequestPasswordResetForm,
  RequestPasswordResetFormValues,
} from "@/features/form";
import { useToast } from "@chakra-ui/react";

const PasswordResetPage = () => {
  const router = useRouter();
  const toast = useToast();

  const handleRequestPasswordReset = (
    values: RequestPasswordResetFormValues
  ) => {};

  return (
    <PageLayout title="Resetowanie hasła" backlinkHref="/login" showTitle>
      <RequestPasswordResetForm
        initialValues={{ email: "" }}
        onSubmit={handleRequestPasswordReset}
      />
    </PageLayout>
  );
};

export default PasswordResetPage;
