import { Model } from "sequelize";

class ContributorText extends Model {}

export default function(sequelize, type) {
  return ContributorText.init(
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
    { sequelize, timestamps: false, tableName: "contributor_text", modelName: "contributor_text" }
  );
}
