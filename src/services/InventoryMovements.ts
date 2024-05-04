import { sequelize } from "../DB/connection";
import {
  InventoryMovements,
  InventoryMovementsInterface,
} from "../DB/models/InventoryMovements";
import { Orders } from "../DB/models/Orders";
import { Place } from "../DB/models/Place";

export class InventoryMovementsService {
  static async create(movement: InventoryMovementsInterface) {
    const newMovements = await InventoryMovements.create(movement);
    return newMovements;
  }

  static async deleteMovement(idMovement: string) {
    const deletedRows = await InventoryMovements.destroy({
      where: { id: idMovement },
    });

    return deletedRows;
  }

  static async getLastMovements() {
    const movementByOrder = await sequelize.query(
      `SELECT im.id, im."createdAt", im.order_id, p.id as place_id, p.name as place_name
FROM
    "InventoryMovements" as im
    INNER JOIN "Places" as p ON im.place_id = p.id
LIMIT 20;
   `
    );

    return movementByOrder[0];
  }
}
