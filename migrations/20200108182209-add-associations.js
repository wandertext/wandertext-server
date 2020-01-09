"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("entries", "textId", {
      type: Sequelize.STRING,
      references: {
        model: "texts",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("entries", "placeId", {
      type: Sequelize.STRING,
      references: {
        model: "places",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "placeId", {
      type: Sequelize.STRING,
      references: {
        model: "places",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "contributorId", {
      type: Sequelize.UUID,
      references: {
        model: "contributors",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "entryId", {
      type: Sequelize.UUID,
      references: {
        model: "entries",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "textId", {
      type: Sequelize.STRING,
      references: {
        model: "texts",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.createTable("contributorEntries", {
      createdOn: { allowNull: false, type: Sequelize.DATE },
      ContributorId: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      EntryId: {
        primaryKey: true,
        type: Sequelize.UUID
      }
    });
    await queryInterface.createTable("contributorTexts", {
      createdOn: { allowNull: false, type: Sequelize.DATE },
      ContributorId: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      TextId: {
        primaryKey: true,
        type: Sequelize.STRING
      }
    });
    await queryInterface.createTable("contributorPlaces", {
      createdOn: { allowNull: false, type: Sequelize.DATE },
      ContributorId: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      PlaceId: {
        primaryKey: true,
        type: Sequelize.STRING
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
    await queryInterface.dropTable("contributorEntries");
    await queryInterface.dropTable("contributorTexts");
    await queryInterface.dropTable("contributorPlaces");
  }
};
