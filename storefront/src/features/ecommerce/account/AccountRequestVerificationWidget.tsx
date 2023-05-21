import { useVerification } from "@/features/ecommerce";
import {
  RequestVerificationForm,
  RequestVerificationFormValues,
} from "./forms/RequestVerificationForm";

interface AccountRequestVerificationWidgetProps {
  onSuccess?: () => void;
}

const AccountRequestVerificationWidget = ({
  onSuccess,
}: AccountRequestVerificationWidgetProps) => {
  const { requestVerification } = useVerification();

  const handleSubmit = (values: RequestVerificationFormValues) => {
    requestVerification(values);
    onSuccess?.();
  };

  return (
    <RequestVerificationForm
      initialValues={{ email: "" }}
      onSubmit={handleSubmit}
    />
  );
};

export default AccountRequestVerificationWidget;
