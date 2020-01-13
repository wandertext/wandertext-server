"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("contributors", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT,
        defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        type: Sequelize.TEXT
      },
      lastName: {
        type: Sequelize.TEXT
      },
      enabled: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      editor: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      admin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable("contributors");
  }
};
