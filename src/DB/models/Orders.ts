import { DataTypes } from "sequelize";
import { sequelize } from "../connection";
import { OrderDetails } from "./OrderDetails";
import { Users } from "./Users";

export const Orders = sequelize.define("Orders", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  client_id: { type: DataTypes.UUID, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
});

Users.hasMany(Orders, { foreignKey: "client_id" });
Orders.belongsTo(Users, { foreignKey: "client_id" });
