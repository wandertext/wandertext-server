/* eslint camelcase: 0 */
import { ApolloError } from "apollo-server-express";

const Text = {
  async contributors(text) {
    try {
      return text.getContributors();
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  async entries(text, _, { db }) {
    try {
      return db.Entry.findAll({ where: { text_id: text.id } });
    } catch (error) {
      throw new ApolloError(error);
    }
  },

  async sortedEntryFeed(text, { cursor, limit }, { db }) {
    const entryIds = text.sortedEntryIds;

    if (!cursor) {
      cursor = entryIds[0];
    }

    if (!limit) {
      limit = 10;
    }

    const index = entryIds.indexOf(cursor);
    const newIndex = index + limit;
    const entryIdsArray = entryIds.slice(index, newIndex);
    const newCursor = entryIds[newIndex];
    const newEntries = await db.sequelize.query(
      `
      WITH x (id_list) as (
        VALUES (ARRAY[${entryIdsArray.map(id => `'${id}'`).join(", ")}])
      )
      SELECT c.* FROM entries c, x
      WHERE id = any(x.id_list)
      ORDER BY array_position(x.id_list, c.id)
    ;`,
      {
        model: db.Entry,
        mapToModel: true
      }
    );

    const sortedEntryFeed = {
      sortedEntries: newEntries,
      cursor: newCursor
    };

    return sortedEntryFeed;
  }
};

export default Text;
