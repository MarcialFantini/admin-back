import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { Users } from "./Users";
import { Place } from "./Place";
import { Operations } from "./Operation";

export interface OrdersInterface {
  id?: string;
  client_id: string;
  operation_id?: string;
  place_id: string;
  isDelete?: boolean;
}

export const Orders = sequelize.define<Model<OrdersInterface>>("Orders", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  client_id: { type: DataTypes.UUID, allowNull: false },
  operation_id: { type: DataTypes.UUID, allowNull: true },
  place_id: { type: DataTypes.UUID, allowNull: true },
  isDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Users.hasMany(Orders, { foreignKey: "client_id" });
Orders.belongsTo(Users, { foreignKey: "client_id" });

Place.hasMany(Orders, { foreignKey: "order_id" });
Orders.belongsTo(Place, { foreignKey: "order_id" });

Orders.belongsTo(Operations, { foreignKey: "operation_id" });
Operations.hasMany(Orders, { foreignKey: "operation_id" });
