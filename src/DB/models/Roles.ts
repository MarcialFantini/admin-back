import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

export interface RolesInterface {
  id?: string;
  name: string;
}

export const Roles = sequelize.define<Model<RolesInterface>>("Roles", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
});
