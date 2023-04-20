import { Formik, FormikConfig } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

import { Form, FormInput, FormSubmit } from "@/components";
import { Flex, InputGroup, InputLeftAddon } from "@chakra-ui/react";

export const addressFormSchema = z.object({
  fullName: z.string().trim(),
  phoneNumber: z.string().trim(),
  streetLine1: z.string().trim(),
  streetLine2: z.string().trim().optional().default(""),
  postalCode: z.string().trim(),
  city: z.string().trim(),
  countryCode: z.string().trim().optional().default("PL"),
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
        <FormInput name="fullName" label="Imię i nazwisko" />
        <FormInput name="phoneNumber" label="Numer telefonu" />
        <FormInput name="streetLine1" label="Adres" />
        <FormInput name="streetLine2" />
        <Flex gap={4}>
          <FormInput name="postalCode" label="Kod pocztowy" />
          <FormInput name="city" label="Knurów" />
        </Flex>
        <FormSubmit isLoading={isLoading}>Zarejestruj się</FormSubmit>
      </Form>
    </Formik>
  );
};
