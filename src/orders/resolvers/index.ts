import { IOrders } from "../types/IOrders"
import { IResolvers } from '@graphql-tools/utils';
import { IContext } from "../..";
import ps from "../../service/pubsub";

async function getOrders(_root: any, _args: any, {ordersAPI}: IContext ): Promise<IOrders[]> {
    return await ordersAPI.getOrders()
}
async function getOrder(_root: any, {id}: {id: string}, {ordersAPI}: IContext ): Promise<IOrders | null> {
    return await ordersAPI.getOrder(id)
}

async function addOrder(_root: any, {order}:{order: Omit<IOrders, 'id'>}, {ordersAPI}: IContext) {
    return await ordersAPI.add(order);     
}
async function editOrder(_root: any, {id, payload}:{id:string, payload: Partial<IOrders>}, {ordersAPI}: IContext) {
    return await ordersAPI.update(id, payload);     
}

async function deleteOrder(_root: any, {id}: {id: string}, {ordersAPI}: IContext ): Promise<{id: string, success: boolean, message: string}> {
    return await ordersAPI.delete(id)
}

function orderCreatedSubscribe(){
    return ps.asyncIterator(['ORDER_CREATED'])
}
function orderModifiedSubscribe(){
    return ps.asyncIterator(['ORDER_MODIFIED'])
}
function orderRemovedSubscribe(){
    return ps.asyncIterator(['ORDER_REMOVED'])
}

export const ordersResolvers: IResolvers = {
    Query: {
        orders: getOrders,
        order: getOrder
    },

    Mutation: {
        addOrder,
        editOrder,
        deleteOrder
    },
    
    Subscription: {
        orderCreated: {
            subscribe: orderCreatedSubscribe,
            resolve: (root) => root
        },
        orderModified: {
            subscribe: orderModifiedSubscribe,
            resolve: (root) => root
        },
        orderRemoved: {
            subscribe: orderRemovedSubscribe,
            resolve: (root) => root
        }
    }
}