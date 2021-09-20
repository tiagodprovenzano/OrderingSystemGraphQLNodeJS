import { IOrders } from "../types/IOrders";
import { FirebaseDB } from "../../service/firebase/FirebaseDB";

export class OrdersAPI extends FirebaseDB<IOrders> {
  constructor() {
    super("orders");
  }
}
