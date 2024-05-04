import { DataTypes, Model, UUID } from "sequelize";
import { sequelize } from "../connection";
import { Place } from "./Place";
import { Orders } from "./Orders";

export interface InventoryMovementsInterface {
  id?: string;

  order_id: string;
  place_id: string;
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
  order_id: { type: DataTypes.UUID, allowNull: true },

  place_id: { type: DataTypes.UUID, allowNull: false },
});

InventoryMovements.belongsTo(Place, { foreignKey: "place_id" });
Place.hasMany(InventoryMovements, { foreignKey: "place_id" });

InventoryMovements.belongsTo(Orders, { foreignKey: "order_id" });
Orders.hasMany(InventoryMovements, { foreignKey: "order_id" });
