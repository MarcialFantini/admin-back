import { DataTypes, Model, UUID } from "sequelize";
import { sequelize } from "../connection";
import { Product } from "./products";

interface InventoryMovementsInterface {
  id: string;
  product_id: string;
  movement_type: string;
  quantity: number;
}

export const InventoryMovements = sequelize.define<
  Model<InventoryMovementsInterface>
>("InventoryMovements", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  product_id: { type: DataTypes.UUID, allowNull: false },
  movement_type: { type: UUID, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});
