import GraphQLJSON from "graphql-type-json";
import GraphQLTimestamp from "../timestamp";
import Query from "./query";
import Contributor from "./contributor";
import Text from "./text";
import Mutation from "./mutation";

const resolvers = {
  Timestamp: GraphQLTimestamp,
  JSON: GraphQLJSON,
  Query,
  Contributor,
  Text,
  Mutation
};

export default resolvers;
