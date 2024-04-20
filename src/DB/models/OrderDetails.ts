import { DataTypes } from "sequelize";
import { sequelize } from "../connection";
import { Orders } from "./Orders";
import { Product } from "./products";

export const OrderDetails = sequelize.define("OrderDetails", {
  id: {
    primaryKey: true,
    allowNull: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  order_id: { type: DataTypes.UUID, allowNull: false },
  product_id: { allowNull: false, type: DataTypes.UUID },
  unit_price: { type: DataTypes.INTEGER, allowNull: false },
});

OrderDetails.belongsTo(Orders, { foreignKey: "order_id" });
Orders.hasMany(OrderDetails, { foreignKey: "order_id" });
