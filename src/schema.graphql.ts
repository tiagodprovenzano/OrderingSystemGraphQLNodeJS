import { mergeTypeDefs } from "@graphql-tools/merge";
import ordersSchema from "./orders/schema/orders.schema";
import usersSchema from "./users/schema/users.schema";

export const typeDefs = mergeTypeDefs([
    ordersSchema,
    usersSchema
])