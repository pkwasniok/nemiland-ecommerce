import { useRouter } from "next/router";
import { useCreateCustomer } from "medusa-react";

import { useToast } from "@chakra-ui/react";
import { PageLayout } from "@/features/layout";
import { RegisterForm, RegisterFormValues } from "@/features/forms";

const RegisterPage = () => {
  const router = useRouter();
  const toast = useToast();

  const register = useCreateCustomer({
    onSuccess: () => {
      toast({
        title: "Zarejestrowano",
        description: "Teraz możesz się zalogować",
        status: "success",
      });
      router.push("/login");
    },
    onError: (error) => {
      toast({
        title: "Coś poszło nie tak...",
        status: "error",
      });
    },
  });

  const handleRegister = async (values: RegisterFormValues) => {
    register.mutate({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <PageLayout title="Rejestracja" backlinkHref="/login" showTitle>
      <RegisterForm
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        isLoading={register.isLoading}
        onSubmit={handleRegister}
      />
    </PageLayout>
  );
};

export default RegisterPage;
