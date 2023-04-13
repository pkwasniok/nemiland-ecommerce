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

export const RegisterForm = ({
  ...props
}: FormikConfig<RegisterFormValues>) => {
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
        <FormSubmit>Zarejestruj się</FormSubmit>
      </Form>
    </Formik>
  );
};
