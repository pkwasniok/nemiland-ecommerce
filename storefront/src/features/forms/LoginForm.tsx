import { Formik, FormikConfig } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { Form, FormInput, FormSubmit } from "@/components/form";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const LoginForm = ({ ...props }: FormikConfig<LoginFormValues>) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(loginFormSchema)}
      {...props}
    >
      <Form>
        <FormInput name="email" label="Adres email" />
        <FormInput name="password" type="password" label="Hasło" />
        <FormSubmit>Zaloguj się</FormSubmit>
      </Form>
    </Formik>
  );
};
