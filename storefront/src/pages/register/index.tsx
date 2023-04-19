import { useRouter } from "next/router";

import { PageLayout } from "@/features/layout";
import { RegisterForm, RegisterFormValues } from "@/features/form";
import { useToast } from "@chakra-ui/react";

const RegisterPage = () => {
  const router = useRouter();
  const toast = useToast();

  const handleRegister = (values: RegisterFormValues) => {};

  return (
    <PageLayout title="Rejestracja" backlinkHref="/login" showTitle>
      <RegisterForm
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={handleRegister}
      />
    </PageLayout>
  );
};

export default RegisterPage;
