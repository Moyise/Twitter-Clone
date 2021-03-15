import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    users: [User!]!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
    profilePic: String!
  }

  type Mutation {
    createUser(
      username: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User!
  }
`;
