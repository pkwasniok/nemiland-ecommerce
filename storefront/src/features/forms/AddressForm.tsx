import { Formik, FormikConfig } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { Flex } from "@chakra-ui/react";
import { Form, FormInput, FormSubmit, FormValue } from "@/components/form";

export const addressFormSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  company: z.string().trim().optional().default(""),
  address1: z.string().trim(),
  address2: z.string().trim().optional().default(""),
  city: z.string().trim(),
  postalCode: z.string().trim(),
  province: z.string().trim(),
  contryCode: z.string().trim(),
  phone: z.string().trim(),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;

interface AddressFormProps extends FormikConfig<AddressFormValues> {
  isLoading?: boolean;
}

export const AddressForm = ({ isLoading, ...props }: AddressFormProps) => {
  return (
    <Formik
      validationSchema={toFormikValidationSchema(addressFormSchema)}
      {...props}
    >
      <Form>
        <Flex gap={4}>
          <FormInput name="firstName" label="Imię*" />
          <FormInput name="lastName" label="Nazwisko*" />
        </Flex>
        <FormInput name="address1" label="Adres*" />
        <FormInput name="address2" />
        <Flex gap={4}>
          <FormInput name="postalCode" label="Kod pocztowy*" />
          <FormInput name="city" label="Miasto*" />
        </Flex>
        <FormInput name="province" label="Województwo*" />
        <FormInput name="phone" label="Numer telefonu*" />
        <FormSubmit isLoading={isLoading}>Zapisz</FormSubmit>
      </Form>
    </Formik>
  );
};
