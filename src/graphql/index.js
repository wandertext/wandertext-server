import { ApolloServer } from "apollo-server-express";
import firestore from "../firestore";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  },
  introspection: true,
  context: () => ({
    db: firestore
  }),
  formatError: error => {
    console.log(error);
    return error;
  }
});

export default apollo;
