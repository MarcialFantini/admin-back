import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { Orders } from "./Orders";

export interface OrderDetailsInterface {
  id?: string;
  order_id: string;
  product_id: string;
  amount: number;
}

export const OrderDetails = sequelize.define<Model<OrderDetailsInterface>>(
  "OrderDetails",
  {
    id: {
      primaryKey: true,
      allowNull: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    order_id: { type: DataTypes.UUID, allowNull: false },
    product_id: { type: DataTypes.UUID, allowNull: false },

    amount: { type: DataTypes.INTEGER, allowNull: false },
  }
);

OrderDetails.belongsTo(Orders, { foreignKey: "order_id" });
Orders.hasMany(OrderDetails, { foreignKey: "order_id" });
