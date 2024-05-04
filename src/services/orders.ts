import { sequelize } from "../DB/connection";
import { InventoryMovements } from "../DB/models/InventoryMovements";
import { OrderDetails } from "../DB/models/OrderDetails";
import { Orders } from "../DB/models/Orders";
import { Place } from "../DB/models/Place";
import { Product } from "../DB/models/products";
import { InventoryMovementsService } from "./InventoryMovements";
import { OrdersDetail } from "./ordersDetail";

export interface OrderDetailsCreateInterface {
  product_id: string;
  amount: number;
}

export class OrdersService {
  static async createOrder(
    idUser: string,
    orders: OrderDetailsCreateInterface[]
  ) {
    try {
      console.log(idUser, orders);
      const order = await Orders.create({
        client_id: idUser,
        status: "initial",
        place_id: "",
      });
      console.log(order);
      console.log("ID ORDER: ", order.dataValues.id);

      const idNewOrder = order.dataValues.id || "";
      console.log(idNewOrder);
      const ordersPromise = orders.map((item) => {
        return OrdersDetail.createOrderDetail(idNewOrder, item);
      });

      const ordersComplete = await Promise.all(ordersPromise);
      console.log(ordersComplete);
      // ordersComplete.forEach((item) => {
      //   if (!item) {
      //     throw new Error("error to completed one transaction");
      //   }
      //   return;
      // });

      return true;
    } catch (error) {
      return false;
    }
  }

  static async getOrders(page: number, limit: number) {
    const orders = await Orders.findAll({
      limit,
      offset: page > 0 ? page * limit : 0,
    });
    return orders;
  }

  static async getOrdersOneWithDetails(idOrder: string) {
    const orders = await Orders.findByPk(idOrder);

    const orderMain = (await sequelize.query(
      `SELECT o.id, o.status, u.name, pl.name as place
from
    "Orders" as o
    INNER JOIN "Places" as pl ON o.place_id = pl.id
    INNER JOIN "Users" as u on u.id = o.client_id
WHERE
    o.id = :idOrder`,
      { replacements: { idOrder: idOrder } }
    )) as any;

    const ordersDetail = await sequelize.query(
      `SELECT od.id, p.name, od.amount, p.price
FROM
    "Orders" as o
    INNER JOIN "OrderDetails" as od ON o.id = od.order_id
    INNER JOIN "Products" as p ON p.id = od.product_id
    
WHERE
    o.id = :idOrder ;`,
      { replacements: { idOrder: idOrder } }
    );

    const details = ordersDetail[0].map((item) => item);

    return { ...orderMain[0][0], details };
  }

  static async changeOrderPlace(idOrder: string, placeId: string) {
    const updateOrder = await Orders.update(
      { place_id: placeId },
      { where: { id: idOrder } }
    );

    if (updateOrder[0] <= 0) {
      return false;
    }

    await InventoryMovementsService.create({
      place_id: placeId,
      order_id: idOrder,
    });
    return true;
  }
}
