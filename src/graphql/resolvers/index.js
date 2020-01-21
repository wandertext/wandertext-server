import GraphQLJSON from "graphql-type-json";
import { GraphQLDateTime } from "graphql-iso-date";
import Query from "./query";
import Contributor from "./contributor";
import Entry from "./entry";
import Text from "./text";
import Mutation from "./mutations";

const resolvers = {
  JSON: GraphQLJSON,
  DateTime: GraphQLDateTime,
  Query,
  Contributor,
  Entry,
  Text,
  Mutation
};

export default resolvers;
