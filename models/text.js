"use strict";
module.exports = (sequelize, DataTypes) => {
  const Text = sequelize.define(
    "Text",
    {
      name: DataTypes.STRING,
      year: DataTypes.INTEGER,
      markdownName: DataTypes.STRING,
      markdownBlurb: DataTypes.TEXT,
      url: DataTypes.STRING,
      imgSrc: DataTypes.STRING,
      imgCredit: DataTypes.STRING,
      imgHref: DataTypes.STRING,
      entryProperties: DataTypes.JSONB,
      properties: DataTypes.JSONB
    },
    {}
  );
  Text.associate = function(models) {
    Text.belongsToMany(models.Contributor, { through: "contributorTexts" });
    Text.hasMany(models.Entry);
    Text.hasMany(models.Flag);
  };

  return Text;
};
