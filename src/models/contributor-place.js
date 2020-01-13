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
      createdOn: {
        allowNull: false,
        defaultValue: type.fn("now"),
        type: type.DATE
      }
    },
    { sequelize, timestamps: false, modelName: "contributor_place" }
  );
}
