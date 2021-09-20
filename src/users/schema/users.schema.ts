import { gql } from "apollo-server-core";

export default gql`

    type User {
        id: ID!
        name: String!
        email: String!
    }

    input AddUser {
        name: String!
        email: String!
    }

    type Query {
        users: [User]
        user(id: ID!): User
    }



    type Mutation {
        addUser(user: AddUser): User 
    }
`