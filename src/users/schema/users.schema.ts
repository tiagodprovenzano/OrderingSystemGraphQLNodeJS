import { gql } from "apollo-server-core";

export default gql`

    type User {
        id: ID!
        name: String!
        email: String!
    }
`