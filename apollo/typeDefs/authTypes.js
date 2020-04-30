import gql from 'graphql-tag';



const auth = gql`
  type User {
    id: ID
    email: String
  }

  input SignUpInput {
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type SignUpPayload {
    user: User!
  }

  type SignInPayload {
    user: User!
  }

  extend type Query {
    user(id: ID!): User!
    users: [User]!
    viewer: User
  }

  extend type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
  }
`

module.exports = auth;