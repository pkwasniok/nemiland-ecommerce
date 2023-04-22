import type { AppProps } from "next/app";

import { client } from "@/lib/vendure";
import { ApolloProvider } from "@apollo/client";

import { ChakraProvider } from "@chakra-ui/react";

import { RootLayout } from "@/features/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ChakraProvider>
    </ApolloProvider>
  );
}
