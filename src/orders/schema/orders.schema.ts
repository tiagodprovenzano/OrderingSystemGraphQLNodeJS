import { gql } from 'apollo-server-core';

export default gql`

    type Order {
        id: ID!
        comment: String!
        active: Boolean!
        userId: ID
        user: User
    }

    type Query {
        orders: [Order]
        order(id: ID!):Order
    }

    input AddOrder{
        comment: String!
        active: Boolean!
    }
    input EditOrder{
        comment: String
        active: Boolean
        id: ID
    }

    type Subscription{
        orderCreated: Order
        orderModified: Order
        orderRemoved: Order
    }

    type DeletionMessage {id: ID!, success: Boolean!, message: String!}

    type Mutation {
        addOrder(order: AddOrder!):Order
        editOrder(id: ID!, payload: EditOrder!):Order
        deleteOrder(id: ID!):DeletionMessage
    }
`