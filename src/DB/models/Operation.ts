import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

export interface OperationsInterface {
  id?: string;
  name: string;
}

export const Operations = sequelize.define<Model<OperationsInterface>>(
  "Operations",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  }
);
