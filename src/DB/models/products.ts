import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { OrderDetails } from "./OrderDetails";
import { InventoryMovements } from "./InventoryMovements";
import { Categories } from "./Categories";
import { Place } from "./Place";
import { Operations } from "./Operation";

export interface ProductInterface {
  id?: string;
  name: string;
  description: string;
  category_id: string;

  operation_id: string;
  stock: number;
  price: number;
}

export const Product = sequelize.define<Model<ProductInterface>>("Product", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  category_id: { type: DataTypes.UUID, allowNull: false },

  stock: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  operation_id: { type: DataTypes.UUID, allowNull: true },
});

Categories.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Categories, { foreignKey: "category_id" });

OrderDetails.hasMany(Product, { foreignKey: "product_id" });
Product.belongsTo(OrderDetails, { foreignKey: "product_id" });

Product.hasMany(InventoryMovements, { foreignKey: "product_id" });
InventoryMovements.belongsTo(Product, { foreignKey: "product_id" });

Operations.hasOne(Product, { foreignKey: "operation_id" });
Product.belongsTo(Operations, { foreignKey: "operation_id" });
