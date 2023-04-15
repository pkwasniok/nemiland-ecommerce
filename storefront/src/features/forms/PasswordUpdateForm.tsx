import { Formik, FormikConfig } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { Form, FormInput, FormSubmit } from "@/components/form";

export const passwordUpdateFormSchema = z.object({
  password: z.string().trim(),
});

export type PasswordUpdateFormValues = z.infer<typeof passwordUpdateFormSchema>;

interface CustomerUpdateFormProps
  extends FormikConfig<PasswordUpdateFormValues> {
  isLoading?: boolean;
}

export const PasswordUpdateForm = ({
  isLoading,
  ...props
}: CustomerUpdateFormProps) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(passwordUpdateFormSchema)}
      {...props}
    >
      <Form>
        <FormInput name="password" label="Nowe hasło" />
        <FormSubmit isLoading={isLoading}>Zmień hasło</FormSubmit>
      </Form>
    </Formik>
  );
};
