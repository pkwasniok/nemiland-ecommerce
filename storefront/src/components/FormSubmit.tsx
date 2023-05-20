import { Button, ButtonProps } from "@chakra-ui/react";

interface FormSubmitProps
  extends Omit<ButtonProps, "variant" | "type" | "colorScheme"> {}

const FormSubmit = ({ children, ...props }: FormSubmitProps) => {
  return (
    <Button type="submit" {...props}>
      {children}
    </Button>
  );
};

export default FormSubmit;
