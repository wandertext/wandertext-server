import { ApolloError } from "apollo-server-express";

const Contributor = {
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
};

export default Contributor;
