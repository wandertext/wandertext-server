import { ApolloError } from "apollo-server-express";

const Mutation = {
  async updateEntry(_, { contributor, id, attestedName, properties }, { db }) {
    try {
      const update = { contributor };
      if (properties) {
        update.properties = properties;
      }

      if (attestedName) {
        update.attestedName = attestedName;
      }

      await db.doc(`entries/${id}`).update(update);
      const entry = await db
        .doc(`entries/${id}`)
        .get()
        .then(d => d.data());
      return {
        entry,
        contributor,
        success: true,
        message: `Update of entry ${id} succeeded`
      };
    } catch (error) {
      throw new ApolloError(error);
    }
  }
};

export default Mutation;
