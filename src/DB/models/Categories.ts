import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

export interface CategoriesInterface {
  id: string;
  name: string;
}

export const Categories = sequelize.define<Model<CategoriesInterface>>(
  "Categories",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
  }
);
