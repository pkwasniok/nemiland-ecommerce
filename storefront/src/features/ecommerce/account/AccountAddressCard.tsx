import { Flex, Text, IconButton } from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";

interface AccountAddressCardProps {
  fullName: string;
  phoneNumber: string;
  streetLine1: string;
  streetLine2?: string;
  postalCode: string;
  city: string;
  onUpdateClick?: () => void;
}

const AccountAddressCard = ({
  fullName,
  phoneNumber,
  streetLine1,
  streetLine2,
  postalCode,
  city,
  onUpdateClick,
}: AccountAddressCardProps) => {
  return (
    <Flex
      position="relative"
      p={6}
      direction="column"
      gap={1}
      borderRadius={6}
      bgColor="white"
    >
      <Text fontWeight="semibold">{fullName}</Text>
      <Text>{phoneNumber}</Text>
      <Text>{streetLine1}</Text>
      {streetLine2 && <Text>{streetLine2}</Text>}
      <Text>
        {postalCode} {city}
      </Text>

      {onUpdate && (
        <Flex position="absolute" top={4} right={4} gap={3}>
          <IconButton
            variant="ghost"
            size="sm"
            icon={<FiEdit />}
            aria-label="edit address"
            onClick={onUpdateClick}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default AccountAddressCard;
