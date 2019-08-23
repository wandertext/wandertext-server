/* eslint newcap: 1 */
import firebase from "firebase";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

const GraphQLTimestamp = new GraphQLScalarType({
  name: "Timestamp",
  description: "Google Firestore Timestamp type. See https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp.html",
  serialize(value) {
    return value.toMillis();
  },
  parseValue(value) {
    return new firebase.firestore.Timestamp.fromMillis(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new firebase.firestore.Timestamp.fromMillis(ast.value);
    }

    return null;
  }
});

export default GraphQLTimestamp;
