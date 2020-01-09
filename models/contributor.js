"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contributor = sequelize.define(
    "Contributor",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      enabled: DataTypes.BOOLEAN,
      editor: DataTypes.BOOLEAN,
      admin: DataTypes.BOOLEAN
    },
    {}
  );
  Contributor.associate = function(models) {
    Contributor.belongsToMany(models.Entry, { through: "contributorEntries" });
    Contributor.belongsToMany(models.Text, { through: "contributorTexts" });
    Contributor.belongsToMany(models.Place, { through: "contributorPlaces" });
    Contributor.hasMany(models.Flag);
  };

  return Contributor;
};
