import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { resolvers } from "@/graphql/resolvers";
import { typeDefs } from "@/graphql/schemas";

const apolloServer = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res }),
});
