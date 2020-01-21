/* eslint camelcase: 0 */
import { ApolloError } from "apollo-server-express";

const Entry = {
  async place(entry, _, { db }) {
    try {
      return db.Place.findByPk(entry.placeId);
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}

export default Entry;
