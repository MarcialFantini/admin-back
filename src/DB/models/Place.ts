import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection";

export interface PlaceInterface {
  id?: string;
  name: string;
}

export const Place = sequelize.define<Model<PlaceInterface>>("Place", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
});
