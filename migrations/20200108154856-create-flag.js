"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("flags", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      comment: {
        allowNull: false,
        type: Sequelize.TEXT
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
    return queryInterface.dropTable("flags");
  }
};
