"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("flags", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
        defaultValue: Sequelize.UUIDV4
      },
      comment: {
        allowNull: false,
        type: Sequelize.TEXT
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
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("flags");
  }
};
