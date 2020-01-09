"use strict";
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define(
    "Place",
    {
      name: DataTypes.STRING,
      note: DataTypes.TEXT,
      source: DataTypes.STRING,
      latitude: DataTypes.REAL,
      longitude: DataTypes.REAL,
      point: DataTypes.GEOMETRY("POINT", 3857),
      geonameId: DataTypes.INTEGER,
      confidence: DataTypes.INTEGER
    },
    {}
  );
  Place.associate = function(models) {
    Place.belongsToMany(models.Contributor, { through: "contributorPlaces" });
    Place.hasMany(models.Entry);
    Place.hasMany(models.Flag);
  };

  return Place;
};
