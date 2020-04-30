// This root, Mutation and Query only serve on purpose — to
// be extended on by the Queries and Mutations in my other
// files. It’s a current limitation of Apollo-Server that
// these “base” types require having a Query or Mutation on
// them.



import gql from 'graphql-tag'

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

module.exports = root;