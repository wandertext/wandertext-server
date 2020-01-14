import { Model } from "sequelize";

class ContributorText extends Model {}

export default function(sequelize, type) {
  return ContributorText.init(
    {
      contributorId: {
        field: "contributor_id",
        type: type.TEXT,
        references: {
          model: "contributors",
          key: "id"
        }
      },
      textId: {
        field: "text_id",
        type: type.TEXT,
        references: {
          model: "texts",
          key: "id"
        }
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
