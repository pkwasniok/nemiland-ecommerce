import { Formik, FormikConfig } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { Form, FormInput, FormSubmit } from "@/components/form";

export const customerUpdateFormSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
});

export type CustomerUpdateFormValues = z.infer<typeof customerUpdateFormSchema>;

interface CustomerUpdateFormProps
  extends FormikConfig<CustomerUpdateFormValues> {
  isLoading?: boolean;
}

export const CustomerUpdateForm = ({
  isLoading,
  ...props
}: CustomerUpdateFormProps) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(customerUpdateFormSchema)}
      {...props}
    >
      <Form>
        <FormInput name="firstName" label="Imię" />
        <FormInput name="lastName" label="Nazwisko" />
        <FormSubmit isLoading={isLoading}>Zapisz</FormSubmit>
      </Form>
    </Formik>
  );
};
