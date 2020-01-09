"use strict";
module.exports = (sequelize, DataTypes) => {
  const Flag = sequelize.define(
    "Flag",
    {
      comment: DataTypes.TEXT
    },
    {}
  );
  Flag.associate = function(models) {
    Flag.belongsTo(models.Contributor);
    Flag.belongsTo(models.Entry);
    Flag.belongsTo(models.Place);
    Flag.belongsTo(models.Text);
  };

  return Flag;
};
