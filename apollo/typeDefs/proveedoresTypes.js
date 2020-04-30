import gql from 'graphql-tag';

const proveedores = gql`
  type Proveedor {
    id: ID!
    nombre: String!
    descripcion: String
    imagen: String
    orden: Int
    productos: [ID]!
    direccion: String
    observaciones: String
    telefono: Telefono
    email: String
    id_tributario: String
    color: String
    created: Date
    modified: Date
  }

  extend type Query {
    proveedores: [Proveedor]
    proveedor(id: ID!): Proveedor
  }

  extend type Mutation {
    addProveedor(input: ProveedorInput): ProveedorResponse!
    modProveedor(id: ID!, input: ProveedorInput): ProveedorResponse!
    delProveedor(id: ID!): ProveedorDelResponse!
  }

  input ProveedorInput {
    nombre: String!
    descripcion: String
    imagen: String
    orden: Int
    direccion: String
    observaciones: String
    telefono: TelefonoInput
    email: String
    id_tributario: String
    color: String
  }

  type ProveedorResponse {
    success: Boolean!
    message: String
    object: Proveedor
  }
  type ProveedorDelResponse {
    success: Boolean!
    message: String
  }
`;

module.exports = proveedores;
