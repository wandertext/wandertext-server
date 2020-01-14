import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "../models";

const db = models();

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  },
  introspection: true,
  context: () => ({
    db
  }),
  formatError: error => {
    console.log(error);
    return error;
  }
});

export default apollo;
