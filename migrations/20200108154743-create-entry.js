"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("entries", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      attested_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.TEXT
      },
      properties: {
        allowNull: false,
        type: Sequelize.JSONB
      },
      created_on: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE
      },
      modified_on: {
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("entries");
  }
};
