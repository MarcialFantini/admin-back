import { Operations } from "../DB/models/Operation";

export class OperationsService {
  static async create(name: string) {
    const newOperation = await Operations.create({ name });

    return newOperation;
  }
  static async delete(idOperation: string) {
    const rowsDeleted = await Operations.destroy({
      where: { id: idOperation },
    });
    return rowsDeleted;
  }

  static async getOperation() {
    const operationList = await Operations.findAll({ limit: 20 });
    return operationList;
  }
}
