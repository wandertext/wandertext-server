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
    await queryInterface.createTable("contributors_entries", {
      created_on: {
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
        type: Sequelize.DATE
      },
      contributor_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "contributors",
          key: "id"
        }
      },
      entry_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "entries",
          key: "id"
        }
      }
    });
    await queryInterface.createTable("contributors_texts", {
      created_on: {
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
        type: Sequelize.DATE
      },
      contributor_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "contributors",
          key: "id"
        }
      },
      text_id: {
        primaryKey: true,
        type: Sequelize.STRING,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "texts",
          key: "id"
        }
      }
    });
    await queryInterface.createTable("contributors_places", {
      created_on: {
        defaultValue: Sequelize.fn("now"),
        allowNull: false,
        type: Sequelize.DATE
      },
      contributor_id: {
        primaryKey: true,
        type: Sequelize.UUID,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "contributors",
          key: "id"
        }
      },
      place_id: {
        primaryKey: true,
        type: Sequelize.STRING,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "places",
          key: "id"
        }
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
    await queryInterface.dropTable("contributors_entries");
    await queryInterface.dropTable("contributors_texts");
    await queryInterface.dropTable("contributors_places");
  }
};
