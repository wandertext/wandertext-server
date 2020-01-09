"use strict";
module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define(
    "Entry",
    {
      attestedName: DataTypes.STRING,
      note: DataTypes.TEXT,
      properties: DataTypes.JSONB
    },
    {}
  );
  Entry.associate = function(models) {
    Entry.belongsTo(models.Place);
    Entry.belongsTo(models.Text);
    Entry.belongsToMany(models.Contributor, { through: "contributorEntries" });
    Entry.hasMany(models.Flag);
  };

  return Entry;
};
