import pubsub from "../../service/pubsub";
import { OrdersAPI } from "../data/OrdersAPI";
import { IOrders } from "../types/IOrders";

enum Topic {
  ORDER_CREATED = "ORDER_CREATED",
  ORDER_MODIFIED = "ORDER_MODIFIED",
  ORDER_REMOVED = "ORDER_REMOVED",
}

export default function (ps: typeof pubsub) {
  ps.registerHandler(Topic.ORDER_CREATED, (broadcast) => {
    return new OrdersAPI().createSubscription(
      "added",
      broadcast as (value: IOrders) => void
    );
  });
  ps.registerHandler(Topic.ORDER_MODIFIED, (broadcast) => {
    return new OrdersAPI().createSubscription(
      "modified",
      broadcast as (value: IOrders) => void
    );
  });
  ps.registerHandler(Topic.ORDER_REMOVED, (broadcast) => {
    return new OrdersAPI().createSubscription(
      "removed",
      broadcast as (value: IOrders) => void
    );
  });
}
