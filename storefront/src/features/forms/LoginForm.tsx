import { Formik, FormikConfig } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { Form, FormInput, FormSubmit } from "@/components/form";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps extends FormikConfig<LoginFormValues> {
  isLoading?: boolean;
}

export const LoginForm = ({ isLoading, ...props }: LoginFormProps) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(loginFormSchema)}
      {...props}
    >
      <Form>
        <FormInput name="email" label="Adres email" />
        <FormInput name="password" type="password" label="Hasło" />
        <FormSubmit isLoading={isLoading}>Zaloguj się</FormSubmit>
      </Form>
    </Formik>
  );
};
