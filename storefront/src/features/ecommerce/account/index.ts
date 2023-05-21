import useLogin from "./hooks/useLogin";
import useRegister from "./hooks/useRegister";
import useLogout from "./hooks/useLogout";
import useActiveCustomer from "./hooks/useActiveCustomer";
import useVerification from "./hooks/useVerification";
import AccountLoginWidget from "./AccountLoginWidget";
import AccountRegisterWidget from "./AccountRegisterWidget";
import AccountUpdateWidget from "./AccountUpdateWidget";
import AccountAddressCard from "./AccountAddressCard";
import AccountAddressCreateModal from "./AccountAddressCreateModal";
import AccountAddressUpdateModal from "./AccountAddressUpdateModal";
import AccountRequestVerificationWidget from "./AccountRequestVerificationWidget";

const Account = {
  LoginWidget: AccountLoginWidget,
  RegisterWidget: AccountRegisterWidget,
  UpdateWidget: AccountUpdateWidget,
  RequestVerificationWidget: AccountRequestVerificationWidget,
  AddressCard: AccountAddressCard,
  AddressCreateModal: AccountAddressCreateModal,
  AddressUpdateModal: AccountAddressUpdateModal,
};

export {
  useLogin,
  useRegister,
  useLogout,
  useActiveCustomer,
  useVerification,
  Account,
};
