import type { AppProps } from "next/app";

import { client } from "@/lib/vendure";
import { Provider } from "urql";

import { ChakraProvider } from "@chakra-ui/react";

import { RootLayout } from "@/features/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ChakraProvider>
    </Provider>
  );
}
