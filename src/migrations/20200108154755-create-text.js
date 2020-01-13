"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("texts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      year: {
        type: Sequelize.INTEGER
      },
      markdownName: {
        type: Sequelize.TEXT
      },
      markdownBlurb: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      imgSrc: {
        type: Sequelize.TEXT
      },
      imgCredit: {
        type: Sequelize.TEXT
      },
      imgHref: {
        type: Sequelize.TEXT
      },
      entryProperties: {
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
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("texts");
  }
};
