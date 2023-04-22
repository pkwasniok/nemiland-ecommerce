import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/shop-api",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
