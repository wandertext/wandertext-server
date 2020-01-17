/* eslint camelcase:0 */
import { ApolloError } from "apollo-server-express";

const Mutation = {
  async editEntry(_, { entryJSON, contributorId }, { db }) {
    const values = JSON.parse(entryJSON);
    values.modifiedAt = new Date();
    try {
      let message;
      const [returnedEntry, newEntry] = await db.Entry.upsert(values, {
        returning: true,
        logging(log) {
          message = log;
        }
      });
      const entry = returnedEntry.toJSON();
      await db.ContributorEntry.findOrCreate({
        where: {
          contributorId,
          entryId: entry.id
        }
      });
      return {
        entry,
        newEntry,
        success: true,
        message
      };
    } catch (error) {
      return {
        success: false,
        message: new ApolloError(error)
      };
    }
  }
};

export default Mutation;
