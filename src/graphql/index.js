import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  },
  introspection: true
});

export default apollo;
