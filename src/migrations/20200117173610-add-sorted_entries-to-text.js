'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("texts", "sorted_entries", {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("texts", "sorted_entries");
  }
};
