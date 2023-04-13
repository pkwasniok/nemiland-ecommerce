import { Formik, FormikConfig } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { Form, FormInput, FormSubmit } from "@/components/form";

export const registerFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

interface RegisterFormProps extends FormikConfig<RegisterFormValues> {
  isLoading?: boolean;
}

export const RegisterForm = ({ isLoading, ...props }: RegisterFormProps) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(registerFormSchema)}
      {...props}
    >
      <Form>
        <FormInput name="firstName" label="Imię" />
        <FormInput name="lastName" label="Nazwisko" />
        <FormInput name="email" label="Adres email" />
        <FormInput name="password" type="password" label="Hasło" />
        <FormSubmit isLoading={isLoading}>Zarejestruj się</FormSubmit>
      </Form>
    </Formik>
  );
};
