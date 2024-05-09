import { DataTypes, Model } from "sequelize";
import { Sections } from "../../sections/roles";
import { sequelize } from "../connection";

export interface rolesSectionsInterface {
  id?: string;
  role_id: string;
  section: Sections | string;
}

export const rolesSections = sequelize.define<Model<rolesSectionsInterface>>(
  "rolesSections",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    role_id: { type: DataTypes.UUID, allowNull: false },
    section: { type: DataTypes.STRING, allowNull: false },
  }
);
