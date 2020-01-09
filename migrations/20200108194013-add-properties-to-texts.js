"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("texts", "properties", {
      type: Sequelize.JSONB
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("texts", "properties");
  }
};
