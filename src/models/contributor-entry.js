import { Model } from "sequelize";

class ContributorEntry extends Model {}

export default function(sequelize, type) {
  return ContributorEntry.init(
    {
      contributorId: {
        field: "contributor_id",
        type: type.TEXT,
        references: {
          model: "contributors",
          key: "id"
        }
      },
      entryId: {
        field: "entry_id",
        type: type.TEXT,
        references: {
          model: "entries",
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
    { sequelize, timestamps: false, modelName: "contributor_entry", tableName: "contributor_entry" }
  );
}
