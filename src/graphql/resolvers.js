import { ApolloError } from "apollo-server-express";
import GraphQLJSON from "graphql-type-json";
import getAll from "../verbs/get-all";
import getOne from "../verbs/get-one";
import GraphQLTimestamp from "./timestamp";

const resolvers = {
  Timestamp: GraphQLTimestamp,
  JSON: GraphQLJSON,
  Query: {
    contributor: (_, { id }, context) => getOne("contributors", id, context),
    contributors: (_, __, context) => getAll("contributors", context),
    entries: (_, __, context) => getAll("entries", context),
    place: (_, { id }, context) => getOne("places", id, context),
    text: (_, { id }, context) => getOne("texts", id, context),
    texts: (_, __, context) => getAll("texts", context),
    publicTexts: (_, __, context) =>
      context.db
        .collection("texts")
        .where("public", "==", true)
        .get()
        .then(ref => ref.docs.map(doc => doc.data()))
        .catch(error => console.log(error))
  },
  Contributor: {
    async entries(contributor, _, context) {
      try {
        const ref = await context.db
          .collection("entries")
          .where("contributors", "array-contains", contributor.id)
          .get();
        return ref.docs.map(doc => doc.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async texts(contributor, _, context) {
      try {
        const ref = await context.db
          .collection("texts")
          .where("contributors", "array-contains", contributor.id)
          .get();
        return ref.docs.map(doc => doc.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  Entry: {
    async contributors(entry, _, context) {
      try {
        const ref = await context.db.collection("contributors").get();
        return entry.contributors.map(id =>
          ref.docs.filter(doc => doc.id === id)[0].data()
        );
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    place: entry => getOne("places", entry.place)
  },
  Text: {
    async contributors(text, _, context) {
      try {
        const ref = await context.db.collection("contributors").get();
        return text.contributors.map(id =>
          ref.docs.filter(doc => doc.id === id)[0].data()
        );
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    sortedEntries(text, _, context) {
      return Promise.all(
        text.sortedEntries.map(entryId =>
          context.db
            .doc(`entries/${entryId}`)
            .get()
            .then(doc => doc.data())
        )
      );
    },
    async sortedEntryFeed(text, { cursor, limit }, context) {
      const entryIds = text.sortedEntries;
      if (!cursor) {
        cursor = entryIds[0];
      }

      if (!limit) {
        limit = 10;
      }

      const index = entryIds.indexOf(cursor);
      const newIndex = index + limit;
      const newEntries = entryIds.slice(index, newIndex);
      const newCursor = entryIds[newIndex];

      const sortedEntryFeed = {
        sortedEntries: Promise.all(
          newEntries.map(id =>
            context.db
              .doc(`entries/${id}`)
              .get()
              .then(d => d.data())
          )
        ),
        cursor: newCursor
      };

      return sortedEntryFeed;
    }
  }
};

export default resolvers;
