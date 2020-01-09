"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("entries", "text_id", {
      type: Sequelize.STRING,
      references: {
        model: "texts",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("entries", "place_id", {
      type: Sequelize.STRING,
      references: {
        model: "places",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "place_id", {
      type: Sequelize.STRING,
      references: {
        model: "places",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "contributor_id", {
      type: Sequelize.UUID,
      references: {
        model: "contributors",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "entry_id", {
      type: Sequelize.UUID,
      references: {
        model: "entries",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "text_id", {
      type: Sequelize.STRING,
      references: {
        model: "texts",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.createTable("contributor_entries", {
      created_on: { allowNull: false, type: Sequelize.DATE },
      contributor_id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      entry_id: {
        primaryKey: true,
        type: Sequelize.UUID
      }
    });
    await queryInterface.createTable("contributor_texts", {
      created_on: { allowNull: false, type: Sequelize.DATE },
      contributor_id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      text_id: {
        primaryKey: true,
        type: Sequelize.STRING
      }
    });
    await queryInterface.createTable("contributor_places", {
      created_on: { allowNull: false, type: Sequelize.DATE },
      contributor_id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      place_id: {
        primaryKey: true,
        type: Sequelize.STRING
      }
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn("entries", "text_id");
    await queryInterface.removeColumn("entries", "place_id");
    await queryInterface.removeColumn("flags", "place_id");
    await queryInterface.removeColumn("flags", "contributor_id");
    await queryInterface.removeColumn("flags", "entry_id");
    await queryInterface.removeColumn("flags", "text_id");
    await queryInterface.dropTable("contributor_entries");
    await queryInterface.dropTable("contributor_texts");
    await queryInterface.dropTable("contributor_places");
  }
};
