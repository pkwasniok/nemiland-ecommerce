import { Input } from "@chakra-ui/react";

interface FormValuesProps {
  name: string;
  value?: any;
}

const FormValue = ({ name, value }: FormValuesProps) => {
  return <Input name={name} value={value} hidden />;
};

export default FormValue;
