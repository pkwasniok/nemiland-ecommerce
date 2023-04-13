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

export const RequestPasswordResetForm = ({
  ...props
}: FormikConfig<RequestPasswordResetFormValues>) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(
        requestPasswordResetFormSchema
      )}
      {...props}
    >
      <Form>
        <FormInput name="email" label="Adres email" />
        <FormSubmit>Wyślij</FormSubmit>
      </Form>
    </Formik>
  );
};
