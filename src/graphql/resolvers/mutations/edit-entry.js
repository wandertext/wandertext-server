/* eslint camelcase:0 */
import { ApolloError } from "apollo-server-express";
import refreshSortedEntryIds from "../../helpers/refresh-sorted-entry-ids";

export default async function editEntry(
  _,
  { entryJSON, contributorId },
  { db }
) {
  const values = JSON.parse(entryJSON);
  values.modifiedAt = new Date();
  try {
    const result = await db.sequelize.transaction(async transaction => {
      let message;
      const [returnedEntry, newEntry] = await db.Entry.upsert(values, {
        transaction,
        returning: true,
        logging(log) {
          message = log;
        }
      });
      const entry = returnedEntry.toJSON();
      await db.ContributorEntry.findOrCreate({
        transaction,
        where: {
          contributorId,
          entryId: entry.id
        }
      });
      await refreshSortedEntryIds(values.textId, db);
      return {
        entry,
        newEntry,
        success: true,
        message
      };
    });
    return result;
  } catch (error) {
    return {
      success: false,
      message: new ApolloError(error)
    };
  }
}
