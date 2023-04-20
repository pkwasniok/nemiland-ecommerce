import NextLink from "next/link";
import { Box } from "@chakra-ui/react";

interface LogoProps {
  isRedirect?: boolean;
}

const Logo = ({ isRedirect }: LogoProps) => {
  return (
    <Box
      fontSize="xl"
      fontWeight="bold"
      fontFamily="heading"
      {...(isRedirect ? { as: NextLink, href: "/" } : {})}
    >
      Nemiland
    </Box>
  );
};

export default Logo;
