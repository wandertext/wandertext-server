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

  sortedEntries(text, _, context) {
    return Promise.all(
      text.sortedEntries.map(entryId =>
        context.db
          .doc(`entries/${entryId}`)
          .get()
          .then(doc => doc.data())
      )
    );
  },
  async sortedEntryFeed(text, { cursor, limit }, context) {
    const entryIds = text.sortedEntries;
    if (!cursor) {
      cursor = entryIds[0];
    }

    if (!limit) {
      limit = 10;
    }

    const index = entryIds.indexOf(cursor);
    const newIndex = index + limit;
    const newEntries = entryIds.slice(index, newIndex);
    const newCursor = entryIds[newIndex];

    const sortedEntryFeed = {
      sortedEntries: Promise.all(
        newEntries.map(id =>
          context.db
            .doc(`entries/${id}`)
            .get()
            .then(d => d.data())
        )
      ),
      cursor: newCursor
    };

    return sortedEntryFeed;
  }
};

export default Text;
