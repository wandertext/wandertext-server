import { firestore } from "firebase-admin";
import { ApolloError } from "apollo-server-express";
import getAll from "../verbs/get-all";
import getOne from "../verbs/get-one";
import getChildren from "../verbs/get-children";

const resolvers = {
  Query: {
    contributor: (_, { id }) => getOne("contributors", id),
    contributors: () => getAll("contributors"),
    entries: () => getAll("entries"),
    place: (_, { id }) => getOne("places", id),
    text: (_, { id }) => getOne("texts", id),
    texts: () => getAll("texts")
  },
  Contributor: {
    async entries(contributor) {
      try {
        const ref = await firestore()
          .collection("entries")
          .where("contributors", "array-contains", contributor.id)
          .get();
        return ref.docs.map(doc => doc.data());
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async texts(contributor) {
      try {
        const ref = await firestore()
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
    async contributors(entry) {
      try {
        const ref = await firestore()
          .collection("contributors")
          .get();
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
    async contributors(text) {
      try {
        const ref = await firestore()
          .collection("contributors")
          .get();
        return text.contributors.map(id =>
          ref.docs.filter(doc => doc.id === id)[0].data()
        );
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    entries: text => getChildren("entries", text.id, "text")
  }
};

export default resolvers;
