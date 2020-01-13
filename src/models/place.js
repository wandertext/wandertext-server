import { Model } from "sequelize";

class Place extends Model {}

export default function(sequelize, type) {
  return Place.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: type.TEXT
      },
      name: {
        allowNull: false,
        type: type.TEXT
      },
      note: {
        type: type.TEXT
      },
      source: {
        allowNull: false,
        type: type.TEXT
      },
      latitude: {
        type: type.REAL
      },
      longitude: {
        type: type.REAL
      },
      geonameId: {
        type: type.INTEGER
      },
      confidence: {
        type: type.INTEGER
      },
      createdOn: {
        allowNull: false,
        defaultValue: type.fn("now"),
        type: type.DATE
      },
      modifiedOn: {
        allowNull: false,
        defaultValue: type.fn("now"),
        type: type.DATE
      }
    },
    { sequelize, timestamps: false, modelName: "place" }
  );
}
