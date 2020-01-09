"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("texts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      markdown_name: {
        type: Sequelize.STRING
      },
      markdown_blurb: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      img_src: {
        type: Sequelize.STRING
      },
      img_credit: {
        type: Sequelize.STRING
      },
      img_href: {
        type: Sequelize.STRING
      },
      entry_properties: {
        type: Sequelize.JSONB
      },
      created_on: {
        allowNull: false,
        type: Sequelize.DATE
      },
      modified_on: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("texts");
  }
};
