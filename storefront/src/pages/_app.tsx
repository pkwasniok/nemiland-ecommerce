import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MedusaProvider } from "medusa-react";
import { QueryClient } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

import { RootLayout } from "@/features/layout";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: client }}
      baseUrl="http://localhost:9000"
    >
      <ChakraProvider>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </ChakraProvider>
    </MedusaProvider>
  );
}
