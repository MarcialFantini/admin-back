import { OrderDetails } from "../DB/models/OrderDetails";
import { Orders } from "../DB/models/Orders";
import { Product } from "../DB/models/products";
import { InventoryMovementsService } from "./InventoryMovements";
import { OrderDetailsCreateInterface } from "./orders";

export class OrdersDetail {
  static async createOrderDetail(
    idOrder: string,
    orderDetail: OrderDetailsCreateInterface
  ) {
    try {
      const product = await Product.findByPk(orderDetail.product_id, {
        attributes: ["stock"],
      });

      const orderVerify = await Orders.findByPk(idOrder, {
        attributes: ["id"],
      });

      if (!orderVerify) {
        throw new Error("error to found order");
      }
      if (!product) {
        throw new Error("error to found product");
      }
      const rest = product.dataValues.stock - orderDetail.amount;
      console.log("rest: ", rest);
      if (rest < 0) {
        throw new Error("error in stock the product");
      }

      await Product.update(
        { stock: rest },
        { where: { id: orderDetail.product_id } }
      );

      await OrderDetails.create({
        order_id: idOrder,
        product_id: orderDetail.product_id,

        amount: orderDetail.amount,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
