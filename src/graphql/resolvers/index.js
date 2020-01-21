import GraphQLJSON from "graphql-type-json";
import { GraphQLDateTime } from "graphql-iso-date";
import Query from "./query";
import Contributor from "./contributor";
import Text from "./text";
import Mutation from "./mutations";

const resolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,
  Query,
  Contributor,
  Text,
  Mutation
};

export default resolvers;
