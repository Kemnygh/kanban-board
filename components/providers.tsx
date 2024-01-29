import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function Providers(props: any) {
  const client = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
}
