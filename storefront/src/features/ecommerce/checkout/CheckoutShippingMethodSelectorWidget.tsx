import { useQuery, useMutation } from "@apollo/client";
import {
  GQL_QUERY_SHIPPING_METHODS,
  GQL_MUTATION_SELECT_SHIPPING_METHOD,
} from "@/lib/vendure";

import { useToast, Flex, RadioGroup, Radio, Text } from "@chakra-ui/react";
import { Price } from "@/features/utils";

const CheckoutShippingMethodRadio = () => {
  const toast = useToast();
  let shippingMethods = undefined;

  {
    const { data } = useQuery(GQL_QUERY_SHIPPING_METHODS);
    shippingMethods = data?.eligibleShippingMethods ?? undefined;
  }

  const [selectShippingMethodMutation] = useMutation(
    GQL_MUTATION_SELECT_SHIPPING_METHOD,
    {
      onCompleted: (data) => {
        const result = data.setOrderShippingMethod.__typename;
        if (result !== "Order") {
          toast({
            title: "Coś poszło nie tak...",
            description: "Spróbuj ponownie później",
            status: "error",
          });
        }
      },
    }
  );

  const handleChange = (shippingMethodId: string) => {
    selectShippingMethodMutation({ variables: { shippingMethodId } });
  };

  return (
    <RadioGroup colorScheme="green" onChange={handleChange}>
      <Flex direction="column" gap={3}>
        {shippingMethods?.map((shippingMethod, index) => (
          <Radio key={index} value={shippingMethod.id}>
            <Flex gap={1}>
              <Text>{shippingMethod.name}</Text>
              <Price price={shippingMethod.priceWithTax} />
            </Flex>
          </Radio>
        ))}
      </Flex>
    </RadioGroup>
  );
};

export default CheckoutShippingMethodRadio;
