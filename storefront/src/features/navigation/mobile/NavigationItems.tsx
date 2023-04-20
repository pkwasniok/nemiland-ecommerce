import NextLink from "next/link";
import { Button, ButtonProps } from "@chakra-ui/react";

interface NavigationItemProps extends ButtonProps {
  href: string;
}

const NavigationItem = ({ children, href, ...props }: NavigationItemProps) => {
  return (
    <Button
      justifyContent="start"
      variant="ghost"
      as={NextLink}
      href={href}
      {...props}
    >
      {children}
    </Button>
  );
};

export default NavigationItem;
