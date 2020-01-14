"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("entries", "text_id", {
      type: Sequelize.TEXT,
      references: {
        model: "texts",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("entries", "place_id", {
      type: Sequelize.TEXT,
      references: {
        model: "places",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "place_id", {
      type: Sequelize.TEXT,
      references: {
        model: "places",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "contributor_id", {
      type: Sequelize.TEXT,
      references: {
        model: "contributors",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "entry_id", {
      type: Sequelize.TEXT,
      references: {
        model: "entries",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("flags", "text_id", {
      type: Sequelize.TEXT,
      references: {
        model: "texts",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.createTable("contributor_entry", {
      createdAt: {
        defaultValue: Sequelize.fn("now"),
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      contributor_id: {
        field: "contributor_id",
        primaryKey: true,
        type: Sequelize.TEXT
      },
      entry_id: {
        field: "entry_id",
        primaryKey: true,
        type: Sequelize.TEXT
      }
    });
    await queryInterface.createTable("contributor_text", {
      createdAt: {
        defaultValue: Sequelize.fn("now"),
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      contributor_id: {
        field: "contributor_id",
        primaryKey: true,
        type: Sequelize.TEXT
      },
      text_id: {
        field: "text_id",
        primaryKey: true,
        type: Sequelize.TEXT
      }
    });
    await queryInterface.createTable("contributor_place", {
      createdAt: {
        defaultValue: Sequelize.fn("now"),
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      contributor_id: {
        field: "contributor_id",
        primaryKey: true,
        type: Sequelize.TEXT
      },
      place_id: {
        field: "place_id",
        primaryKey: true,
        type: Sequelize.TEXT
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
    await queryInterface.dropTable("contributor_entry");
    await queryInterface.dropTable("contributor_text");
    await queryInterface.dropTable("contributor_place");
  }
};
