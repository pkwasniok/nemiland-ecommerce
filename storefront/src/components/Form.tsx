import { FormHTMLAttributes } from "react";
import { Form as FormikForm } from "formik";

import { Flex } from "@chakra-ui/react";

const Form = ({ children, ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <FormikForm {...props}>
      <Flex direction="column" gap={4}>
        {children}
      </Flex>
    </FormikForm>
  );
};

export default Form;
