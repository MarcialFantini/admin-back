import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { rolesSections } from "./rolesSections";

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

Roles.hasMany(rolesSections, { foreignKey: "role_id" });
rolesSections.belongsTo(Roles, { foreignKey: "role_id" });
