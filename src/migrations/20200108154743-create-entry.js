"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("entries", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
        defaultValue: Sequelize.UUIDV4
      },
      attestedName: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      note: {
        type: Sequelize.TEXT
      },
      properties: {
        allowNull: false,
        type: Sequelize.JSONB
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
      text: {
        type: Sequelize.TEXT
      },
      place: {
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
    return queryInterface.dropTable("entries");
  }
};
