import gql from 'graphql-tag';

const categorias = gql`
  type Categoria {
    id: ID!
    nombre: String!
    descripcion: String
    imagen: String
    orden: Int
    mostrar_caja: Boolean!
    color: String
    created: Date
    modified: Date
  }

  extend type Query {
    categorias: [Categoria]!
    categoria(id: ID!): Categoria
  }

  extend type Mutation {
    addCategoria(input: CategoriaInput): CategoriaResponse!
    modCategoria(id: ID!, input: CategoriaInput): CategoriaResponse!
    delCategoria(id: ID!): CategoriaDelResponse!
  }

  input CategoriaInput {
    nombre: String!
    descripcion: String
    imagen: String
    orden: Int
    mostrar_caja: Boolean!
    color: String
    created: String
  }

  type CategoriaResponse {
    success: Boolean!
    message: String
    object: Categoria
  }
  type CategoriaDelResponse {
    success: Boolean!
    message: String
  }
`;

module.exports = categorias;
