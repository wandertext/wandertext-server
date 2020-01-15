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

  async sortedEntries(text, _, { db }) {
    try {
      let order = [];
      if (text.entrySort) {
        order = text.entrySort.map(key => [`properties.${key}`, "ASC"]);
      } else {
        order = [
          ["properties.page", "ASC"],
          ["properties.sequence", "ASC"]
        ];
      }

      return db.Entry.findAll({ where: { text_id: text.id }, order });
    } catch (error) {
      throw new ApolloError(error);
    }
  },

  async sortedEntryFeed(text, { cursor, limit }, { db }) {
    let sortedEntries;
    let entryIds;
    try {
      let order = [];
      if (text.entrySort) {
        order = text.entrySort.map(key => [`properties.${key}`, "ASC"]);
      } else {
        order = [
          ["properties.page", "ASC"],
          ["properties.sequence", "ASC"]
        ];
      }

      sortedEntries = await db.Entry.findAll({
        where: { text_id: text.id },
        order
      });
      entryIds = sortedEntries.map(e => e.id);
    } catch (error) {
      throw new ApolloError(error);
    }

    if (!cursor) {
      cursor = entryIds[0];
    }

    if (!limit) {
      limit = 10;
    }

    const index = entryIds.indexOf(cursor);
    // Note that I've replaced limit with 1.
    const newIndex = index + 1;
    const newEntries = sortedEntries.slice(index, newIndex);
    const newCursor = entryIds[newIndex];

    const sortedEntryFeed = {
      sortedEntries: newEntries,
      // sortedEntries: Promise.all(
      //   newEntries.map(id =>
      //     context.db
      //       .doc(`entries/${id}`)
      //       .get()
      //       .then(d => d.data())
      //   )
      // ),
      cursor: newCursor
    };

    return sortedEntryFeed;
  }
};

export default Text;
