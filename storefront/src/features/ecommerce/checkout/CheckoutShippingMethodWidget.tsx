import { useQuery } from "@apollo/client";
import { GQL_QUERY_SHIPPING_METHODS, GQL_QUERY_ADDRESSES } from "@/lib/vendure";

import { Price } from "@/features/utils";
import { Flex, RadioGroup, Radio, Divider } from "@chakra-ui/react";
import { AddressForm } from "@/features/form";

const CheckoutShippingMethodWidget = () => {
  let shippingMethods = undefined;
  let addresses = undefined;

  {
    const { data } = useQuery(GQL_QUERY_SHIPPING_METHODS);
    shippingMethods = data?.eligibleShippingMethods ?? undefined;
  }

  {
    const { data } = useQuery(GQL_QUERY_ADDRESSES);
    addresses = data?.activeCustomer?.addresses ?? undefined;
  }

  return (
    <Flex direction="column" gap={6}>
      <RadioGroup colorScheme="green">
        <Flex direction="column" gap={2}>
          {shippingMethods?.map((shippingMethod, index) => (
            <Radio key={index} value={shippingMethod.id}>
              <Flex gap={1}>
                {shippingMethod.name} -
                <Price price={shippingMethod.priceWithTax} />
              </Flex>
            </Radio>
          ))}
        </Flex>
      </RadioGroup>

      <Divider />

      {addresses == undefined && (
        <AddressForm
          initialValues={{
            city: "",
            fullName: "",
            phoneNumber: "",
            postalCode: "",
            streetLine1: "",
            streetLine2: "",
          }}
          onSubmit={(a) => console.log(a)}
        />
      )}

      {addresses?.map((address, index) => (
        <Flex key={index}>{address.fullName}</Flex>
      ))}
    </Flex>
  );
};

export default CheckoutShippingMethodWidget;
