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
    const entryIds = text.sortedEntries;
    let order = [];
    if (text.entrySort) {
      order = text.entrySort.map(key => [`properties.${key}`, "ASC"]);
    } else {
      order = [
        ["properties.page", "ASC"],
        ["properties.sequence", "ASC"]
      ];
    }

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
    const newEntries = await db.Entry.findAll({
      where: {
        id: entryIdsArray
      },
      order
    });

    const sortedEntryFeed = {
      sortedEntries: newEntries,
      cursor: newCursor
    };

    return sortedEntryFeed;
  }
};

export default Text;
