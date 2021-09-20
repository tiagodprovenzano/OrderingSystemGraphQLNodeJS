import { mergeTypeDefs } from "@graphql-tools/merge";
import ordersSchema from "./orders/schema/orders.schema";

export const typeDefs = mergeTypeDefs([
    ordersSchema
])