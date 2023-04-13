import { useRouter } from "next/router";
import client from "@/lib/client";

import { useToast } from "@chakra-ui/react";
import { PageLayout } from "@/features/layout";
import {
  RequestPasswordResetForm,
  RequestPasswordResetFormValues,
} from "@/features/forms";

const PasswordResetPage = () => {
  const router = useRouter();
  const toast = useToast();

  const handleRequestPasswordReset = async (
    values: RequestPasswordResetFormValues
  ) => {
    try {
      await client.customers.generatePasswordToken(values);
      toast({
        title: "Udało się",
        description: "Sprawdz swoją skrzynkę mailową",
        status: "success",
      });
      router.push("/login");
    } catch (e) {
      toast({
        title: "Coś poszło nie tak...",
        description: "Spróbuj ponownie później",
        status: "error",
      });
    }
  };

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
