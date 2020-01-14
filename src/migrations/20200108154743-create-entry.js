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
        field: "attested_name",
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
    return queryInterface.dropTable("entries");
  }
};
