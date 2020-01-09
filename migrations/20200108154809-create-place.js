"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("places", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.TEXT
      },
      source: {
        allowNull: false,
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.REAL
      },
      longitude: {
        type: Sequelize.REAL
      },
      point: {
        type: Sequelize.GEOMETRY("POINT", 3857)
      },
      geonameId: {
        type: Sequelize.INTEGER
      },
      confidence: {
        type: Sequelize.INTEGER
      },
      createdOn: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedOn: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("places");
  }
};
