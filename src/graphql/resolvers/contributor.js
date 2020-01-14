import { ApolloError } from "apollo-server-express";

const Contributor = {
  async entries(contributor) {
    try {
      return contributor.getEntries();
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  async texts(contributor) {
    try {
      return contributor.getTexts();
    } catch (error) {
      throw new ApolloError(error);
    }
  }
};

export default Contributor;
