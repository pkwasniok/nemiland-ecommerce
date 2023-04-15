import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { GQL_MUTATION_REGISTER } from "@/lib/vendure";

import { PageLayout } from "@/features/layout";
import { RegisterForm, RegisterFormValues } from "@/features/form";
import { useToast } from "@chakra-ui/toast";

const RegisterPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [registerMutation] = useMutation(GQL_MUTATION_REGISTER, {
    onCompleted: (data) => {
      const result = data.registerCustomerAccount.__typename;

      if (result == "Success") {
        toast({
          title: "Udało się",
          description:
            "Wysłaliśmy Ci maila z dalszymi instrukcjami do rejestracji konta.",
          status: "success",
        });
        router.push("/login");
      } else {
        toast({
          title: "Coś poszło nie tak...",
          description: "Sprobuj ponownie później.",
          status: "error",
        });
      }
    },
  });

  const handleRegister = (values: RegisterFormValues) => {
    registerMutation({ variables: values });
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
