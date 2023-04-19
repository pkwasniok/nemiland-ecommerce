import { useRouter } from "next/router";
import { useMutation } from "urql";
import { GQL_MUTATION_REGISTER } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { RegisterForm, RegisterFormValues } from "@/features/form";
import { useToast } from "@chakra-ui/react";

const RegisterPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [_, registerMutation] = useMutation(GQL_MUTATION_REGISTER);

  const handleRegister = async (values: RegisterFormValues) => {
    const response = await registerMutation(values);

    const result = response.data?.registerCustomerAccount.__typename;
    if (result == "Success") {
      toast({
        title: "Zarejestrowano",
        description: "Wysłaliśmy Ci linka do weryfikacji konta.",
        status: "success",
      });
      router.push("/login");
    } else {
      toast({
        title: "Coś poszło nie tak...",
        description: "Spróbuj ponownie później.",
        status: "error",
      });
    }
  };

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
