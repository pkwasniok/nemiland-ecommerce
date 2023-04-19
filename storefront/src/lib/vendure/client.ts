import { Client, cacheExchange, fetchExchange } from "urql";

export const client = new Client({
  url: "http://localhost:3000/shop-api",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: "include",
  },
});
