import { IOrders } from "../types/IOrders";
import { FirebaseDB } from "../../service/firebase/FirebaseDB";

export class OrdersAPI extends FirebaseDB<IOrders> {
  constructor() {
    super("orders");
  }

  async getOrders() {
    return await super.getMany();
  }

  async getOrder(id: string) {
    return await super.getOne(id);
  }

  async add(newOrder: Omit<IOrders, "id">) {
    return await super.add(newOrder);
  }

  async update(id: string, payload: Partial<IOrders>) {
    return await super.update(id, payload);
  }
}
