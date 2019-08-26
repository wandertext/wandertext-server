import GraphQLJSON from "graphql-type-json";
import GraphQLTimestamp from "../timestamp";
import Query from "./query";
import Contributor from "./contributor";
import Text from "./text";

const resolvers = {
  Timestamp: GraphQLTimestamp,
  JSON: GraphQLJSON,
  Query,
  Contributor,
  Text
};

export default resolvers;
