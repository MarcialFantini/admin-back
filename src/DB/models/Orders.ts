import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { Users } from "./Users";
import { Place } from "./Place";

export interface OrdersInterface {
  id?: string;
  client_id: string;
  status: string;
  place_id: string;
}

export const Orders = sequelize.define<Model<OrdersInterface>>("Orders", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  client_id: { type: DataTypes.UUID, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  place_id: { type: DataTypes.UUID, allowNull: true },
});

Users.hasMany(Orders, { foreignKey: "client_id" });
Orders.belongsTo(Users, { foreignKey: "client_id" });

Place.hasMany(Orders, { foreignKey: "order_id" });
Orders.belongsTo(Place, { foreignKey: "order_id" });
