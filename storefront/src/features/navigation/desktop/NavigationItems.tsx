import NextLink from "next/link";
import { Button, ButtonProps } from "@chakra-ui/react";

interface NavigationItemProps extends ButtonProps {
  href: string;
  selected?: boolean;
}

const NavigationItem = ({
  children,
  href,
  selected,
  ...props
}: NavigationItemProps) => {
  return (
    <Button
      justifyContent="start"
      variant={selected ? "solid" : "ghost"}
      size="sm"
      as={NextLink}
      href={href}
      {...props}
    >
      {children}
    </Button>
  );
};

export default NavigationItem;
