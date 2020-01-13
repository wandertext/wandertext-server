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
      createdOn: {
        allowNull: false,
        defaultValue: type.fn("now"),
        type: type.DATE
      }
    },
    { sequelize, timestamps: false, modelName: "contributor_text" }
  );
}
