"use strict";

module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn(
      "texts",
      "sorted_entries",
      "sorted_entry_ids"
    );
  },

  down: queryInterface => {
    return queryInterface.renameColumn(
      "texts",
      "sorted_entry_ids",
      "sorted_entries"
    );
  }
};
