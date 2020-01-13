"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("places", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      note: {
        type: Sequelize.TEXT
      },
      source: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      latitude: {
        type: Sequelize.REAL
      },
      longitude: {
        type: Sequelize.REAL
      },
      geonameId: {
        type: Sequelize.INTEGER
      },
      confidence: {
        type: Sequelize.INTEGER
      },
      createdOn: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE
      },
      modifiedOn: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE
      },
      entries: {
        allowNull: false,
        defaultValue: "{}",
        type: Sequelize.TEXT
      },
      contributors: {
        allowNull: false,
        defaultValue: "{}",
        type: Sequelize.TEXT
      },
      flags: {
        allowNull: false,
        defaultValue: "{}",
        type: Sequelize.TEXT
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("places");
  }
};
