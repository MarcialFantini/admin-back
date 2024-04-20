import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { Orders } from "./Orders";
import { Roles } from "./Roles";

export interface UserInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  role_id: string;
}

export const Users = sequelize.define<Model<UserInterface>>("Users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role_id: { type: DataTypes.UUID, allowNull: false },
});

Roles.hasMany(Users, { foreignKey: "role_id" });
Users.belongsTo(Roles, { foreignKey: "role_id" });
