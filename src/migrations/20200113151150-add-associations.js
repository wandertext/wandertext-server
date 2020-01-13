"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("entries", "textId", {
      type: Sequelize.TEXT,
      references: {
        model: "texts",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("entries", "placeId", {
      type: Sequelize.TEXT,
      references: {
        model: "places",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "placeId", {
      type: Sequelize.TEXT,
      references: {
        model: "places",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "contributorId", {
      type: Sequelize.TEXT,
      references: {
        model: "contributors",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "entryId", {
      type: Sequelize.TEXT,
      references: {
        model: "entries",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "textId", {
      type: Sequelize.TEXT,
      references: {
        model: "texts",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.createTable("contributor_entry", {
      createdOn: { allowNull: false, type: Sequelize.DATE },
      contributorId: {
        primaryKey: true,
        type: Sequelize.TEXT
      },
      entryId: {
        primaryKey: true,
        type: Sequelize.TEXT
      }
    });
    await queryInterface.createTable("contributor_text", {
      createdOn: { allowNull: false, type: Sequelize.DATE },
      contributorId: {
        primaryKey: true,
        type: Sequelize.TEXT
      },
      textId: {
        primaryKey: true,
        type: Sequelize.TEXT
      }
    });
    await queryInterface.createTable("contributor_place", {
      createdOn: { allowNull: false, type: Sequelize.DATE },
      contributorId: {
        primaryKey: true,
        type: Sequelize.TEXT
      },
      placeId: {
        primaryKey: true,
        type: Sequelize.TEXT
      }
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn("entries", "textId");
    await queryInterface.removeColumn("entries", "placeId");
    await queryInterface.removeColumn("flags", "placeId");
    await queryInterface.removeColumn("flags", "contributorId");
    await queryInterface.removeColumn("flags", "entryId");
    await queryInterface.removeColumn("flags", "textId");
    await queryInterface.dropTable("contributor_entry");
    await queryInterface.dropTable("contributor_text");
    await queryInterface.dropTable("contributor_place");
  }
};
