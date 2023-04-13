import { Formik, FormikConfig } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { Form, FormInput, FormSubmit } from "@/components/form";

export const requestPasswordResetFormSchema = z.object({
  email: z.string().email(),
});

export type RequestPasswordResetFormValues = z.infer<
  typeof requestPasswordResetFormSchema
>;

interface RequestPasswordResetFormProps
  extends FormikConfig<RequestPasswordResetFormValues> {
  isLoading?: boolean;
}

export const RequestPasswordResetForm = ({
  isLoading,
  ...props
}: RequestPasswordResetFormProps) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(
        requestPasswordResetFormSchema
      )}
      {...props}
    >
      <Form>
        <FormInput name="email" label="Adres email" />
        <FormSubmit isLoading={isLoading}>Wyślij</FormSubmit>
      </Form>
    </Formik>
  );
};
