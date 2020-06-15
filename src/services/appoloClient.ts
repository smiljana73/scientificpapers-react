import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { auth } from "./auth";

const httpLink = createHttpLink({
  uri: "http://localhost:9999/graphql",
  credentials: "include"
});

const authLink = setContext((_, { headers }) => {
  const token = auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
