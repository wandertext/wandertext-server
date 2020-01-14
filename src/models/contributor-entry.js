import { Model } from "sequelize";

class ContributorEntry extends Model {}

export default function(sequelize, type) {
  return ContributorEntry.init(
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
    { sequelize, timestamps: false, modelName: "contributor_entry", tableName: "contributor_entry" }
  );
}
