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
        field: "geoname_id",
        type: type.INTEGER
      },
      confidence: {
        type: type.INTEGER
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        defaultValue: type.fn("now"),
        type: type.DATE
      },
      modifiedAt: {
        field: "modified_at",
        allowNull: false,
        defaultValue: type.fn("now"),
        type: type.DATE
      }
    },
    { sequelize, timestamps: false, modelName: "place" }
  );
}
