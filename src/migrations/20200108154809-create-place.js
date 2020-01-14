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
        field: "geoname_id",
        type: Sequelize.INTEGER
      },
      confidence: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE
      },
      modifiedAt: {
        field: "modified_at",
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("places");
  }
};
