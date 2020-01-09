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
      markdownName: {
        type: Sequelize.STRING
      },
      markdownBlurb: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      imgSrc: {
        type: Sequelize.STRING
      },
      imgCredit: {
        type: Sequelize.STRING
      },
      imgHref: {
        type: Sequelize.STRING
      },
      entryProperties: {
        type: Sequelize.JSONB
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
    return queryInterface.dropTable("texts");
  }
};
