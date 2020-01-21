import Sequelize from "sequelize";
import configFile from "../../config/config.json";
import contributorModel from "./contributor";
import contributorEntryModel from "./contributor-entry";
import contributorTextModel from "./contributor-text";
import contributorPlaceModel from "./contributor-place";
import textModel from "./text";
import entryModel from "./entry";
import placeModel from "./place";
import flagModel from "./flag";

export default function models() {
  const env = process.env.NODE_ENV || "development";
  const config = configFile[env];

  config.logging = false;

  let sequelize;
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }

  const Entry = entryModel(sequelize, Sequelize);
  const Contributor = contributorModel(sequelize, Sequelize);
  const Text = textModel(sequelize, Sequelize);
  const Place = placeModel(sequelize, Sequelize);
  const Flag = flagModel(sequelize, Sequelize);
  const ContributorText = contributorTextModel(sequelize, Sequelize);
  const ContributorEntry = contributorEntryModel(sequelize, Sequelize);
  const ContributorPlace = contributorPlaceModel(sequelize, Sequelize);

  Contributor.belongsToMany(Text, { through: ContributorText, unique: false });
  Contributor.belongsToMany(Place, {
    through: ContributorPlace,
    unique: false
  });
  Contributor.belongsToMany(Entry, {
    through: ContributorEntry,
    unique: false
  });
  Entry.belongsTo(Text, { foreignKey: "text_id" });
  Entry.belongsTo(Place, { foreignKey: "place_id" });
  Entry.belongsToMany(Contributor, {
    through: ContributorEntry,
    unique: false
  });
  Text.belongsToMany(Contributor, { through: ContributorText, unique: false });
  Place.belongsToMany(Contributor, {
    through: ContributorPlace,
    unique: false
  });
  Flag.belongsTo(Contributor, { foreignKey: "contributor_id" });
  Flag.belongsTo(Place, { foreignKey: "place_id" });
  Flag.belongsTo(Entry, { foreignKey: "entry_id" });
  Flag.belongsTo(Text, { foreignKey: "text_id" });

  sequelize.sync().then(() => console.log("db synced"));

  return {
    Entry,
    Place,
    Contributor,
    ContributorEntry,
    ContributorPlace,
    ContributorText,
    Flag,
    Text,
    sequelize
  };
}
