import { Formik, FormikConfig } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { Form, FormInput, FormSubmit } from "@/components";

export const requestVerificationFormSchema = z.object({
  email: z.string().email(),
});

export type RequestVerificationFormValues = z.infer<
  typeof requestVerificationFormSchema
>;

interface RequestVerificationFormProps
  extends FormikConfig<RequestVerificationFormValues> {
  isLoading?: boolean;
}

export const RequestVerificationForm = ({
  isLoading,
  ...props
}: RequestVerificationFormProps) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(requestVerificationFormSchema)}
      {...props}
    >
      <Form>
        <FormInput name="email" label="Adres email" />
        <FormSubmit isLoading={isLoading}>Wyślij</FormSubmit>
      </Form>
    </Formik>
  );
};
