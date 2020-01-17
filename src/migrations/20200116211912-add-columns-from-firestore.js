'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("contributors", "authentication", {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: "nywalker"
    });
    await queryInterface.addColumn("contributors", "email", {
      type: Sequelize.TEXT
    });
    await queryInterface.addColumn("contributors", "nywalker_properties", {
      type: Sequelize.JSONB
    });
    await queryInterface.addColumn("entries", "nywalker_properties", {
      type: Sequelize.JSONB
    });
    await queryInterface.addColumn("flags", "nywalker_properties", {
      type: Sequelize.JSONB
    });
    await queryInterface.addColumn("places", "nywalker_properties", {
      type: Sequelize.JSONB
    });
    await queryInterface.addColumn("places", "bbox", {
      type: Sequelize.TEXT
    });
    await queryInterface.addColumn("texts", "nywalker_properties", {
      type: Sequelize.JSONB
    });
    await queryInterface.addColumn("texts", "popup_template", {
      type: Sequelize.TEXT
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn("contributors", "authentication");
    await queryInterface.removeColumn("contributors", "email");
    await queryInterface.removeColumn("contributors", "nywalker_properties");
    await queryInterface.removeColumn("entries", "nywalker_properties");
    await queryInterface.removeColumn("flags", "nywalker_properties");
    await queryInterface.removeColumn("places", "nywalker_properties");
    await queryInterface.removeColumn("places", "bbox");
    await queryInterface.removeColumn("texts", "nywalker_properties");
    await queryInterface.removeColumn("texts", "popup_template");
  }
};
