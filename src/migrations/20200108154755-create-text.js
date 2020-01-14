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
        field: "markdown_name",
        type: Sequelize.TEXT
      },
      markdownBlurb: {
        field: "markdown_blurb",
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.TEXT
      },
      imgSrc: {
        field: "img_src",
        type: Sequelize.TEXT
      },
      imgCredit: {
        field: "img_credit",
        type: Sequelize.TEXT
      },
      imgHref: {
        field: "img_href",
        type: Sequelize.TEXT
      },
      entryProperties: {
        field: "entry_properties",
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
    return queryInterface.dropTable("texts");
  }
};
