import { Formik, FormikConfig } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { Form, FormInput, FormSubmit } from "@/components";

export const passwordResetFormSchema = z.object({
  newPassword: z.string().trim(),
});

export type PasswordResetFormValues = z.infer<typeof passwordResetFormSchema>;

interface PasswordResetFormProps extends FormikConfig<PasswordResetFormValues> {
  isLoading?: boolean;
}

export const PasswordResetForm = ({
  isLoading,
  ...props
}: PasswordResetFormProps) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(passwordResetFormSchema)}
      {...props}
    >
      <Form>
        <FormInput name="newPassword" label="Nowe hasło" />
        <FormSubmit isLoading={isLoading}>Zmień hasło</FormSubmit>
      </Form>
    </Formik>
  );
};
