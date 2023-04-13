import { useField } from "formik";
import {
  FormControl,
  Input,
  InputProps,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";

interface FormInputProps extends InputProps {
  name: string;
  label?: string;
}

const FormInput = ({ name, label, ...props }: FormInputProps) => {
  const [field, meta] = useField({ name });

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      {label && <FormLabel>{label}</FormLabel>}

      <Input {...field} {...props} />

      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
