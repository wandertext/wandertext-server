"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("places", "point", {
      type: Sequelize.GEOMETRY("POINT", 3857)
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("places", "point");
  }
};
