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
    return queryInterface.dropTable("flags");
  }
};
