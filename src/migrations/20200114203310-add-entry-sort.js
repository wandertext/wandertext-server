"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("texts", "entry_sort", {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("texts", "entry_sort");
  }
};
