import { Model } from "sequelize";

class ContributorPlace extends Model {}

export default function(sequelize, type) {
  return ContributorPlace.init(
    {
      contributorId: {
        field: "contributor_id",
        type: type.TEXT,
        references: {
          model: "contributors",
          key: "id"
        }
      },
      placeId: {
        field: "place_id",
        type: type.TEXT,
        references: {
          model: "places",
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
    { sequelize, timestamps: false, tableName: "contributor_place", modelName: "contributor_place" }
  );
}
