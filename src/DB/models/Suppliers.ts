import { DataTypes } from "sequelize";
import { sequelize } from "../connection";

export const Suppliers = sequelize.define("Suppliers", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.INTEGER, allowNull: false },
});
