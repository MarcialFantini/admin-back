import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";
import { OrderDetails } from "./OrderDetails";
import { InventoryMovements } from "./InventoryMovements";
import { Categories } from "./Categories";
import { Suppliers } from "./Suppliers";

export interface ProductInterface {
  id?: string;
  name: string;
  description: string;
  category_id: string;
  stock: number;
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
});

Categories.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Categories, { foreignKey: "category_id" });

OrderDetails.hasMany(Product, { foreignKey: "product_id" });
Product.belongsTo(OrderDetails, { foreignKey: "product_id" });

Product.hasMany(InventoryMovements, { foreignKey: "product_id" });
InventoryMovements.belongsTo(Product, { foreignKey: "product_id" });
