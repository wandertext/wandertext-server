import { Model } from "sequelize";

class ContributorPlace extends Model {}

export default function(sequelize, type) {
  return ContributorPlace.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: type.TEXT,
        defaultValue: type.UUIDV4
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        defaultValue: type.fn("now"),
        type: type.DATE
      }
    },
    { sequelize, timestamps: false, tableName: "contributor_place", modelName: "contributor_place" }
  );
}
