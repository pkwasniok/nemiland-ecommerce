import { FormHTMLAttributes } from "react";
import { Form as FormikForm } from "formik";

import { Flex } from "@chakra-ui/react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

const Form = ({ children, ...props }: FormProps) => {
  return (
    <FormikForm>
      <Flex direction="column" gap={4}>
        {children}
      </Flex>
    </FormikForm>
  );
};

export default Form;
