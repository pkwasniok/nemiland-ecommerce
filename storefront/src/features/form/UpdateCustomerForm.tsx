import { Formik, FormikConfig } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { Form, FormInput, FormSubmit } from "@/components";

export const updateCustomerFormSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
});

export type UpdateCustomerFormValues = z.infer<typeof updateCustomerFormSchema>;

interface UpdateCustomerFormProps
  extends FormikConfig<UpdateCustomerFormValues> {
  isLoading?: boolean;
}

export const UpdateCustomerForm = ({
  isLoading,
  ...props
}: UpdateCustomerFormProps) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(updateCustomerFormSchema)}
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
