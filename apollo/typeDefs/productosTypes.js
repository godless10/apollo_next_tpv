import gql from 'graphql-tag';

const productos = gql`
  type Producto {
    id: ID!
    nombre: String!
    descripcion: String
    """
    Cantidad a la venta
    """
    cantidad_venta: Int
    coste: Float
    precio: Float
    impuesto: Float
    fecha_creacion: Date!
    ultimo_movimiento: Date
    unidad_medida: UnidadMedida
    codigo_barra: String
    stock_minimo: Int
    stock_bodega: Int
    tipo_producto: TipoProducto
    estado_inv: EstadoInventario
    proveedores: [Proveedor]!
    multiplicador_hijos: Int
    imagen: String
    orden: Int
    mostrar_caja: Boolean!
    color: String
    # categoria: [Categoria]!
  }

  extend type Query {
    productosCategoria(categoriaID: ID!): [Producto]!
    productosProveedor(proveedorID: ID!): [Producto]!
    productos: [Producto]!
    producto(id: ID!): Producto
  }

  extend type Mutation {
    addProducto(categoriaID: ID!, input: ProductoInput): ProductoResponse!
    modProducto(id: ID!, input: ProductoInput): ProductoResponse!
    delProducto(id: ID!): ProductoDelResponse!
  }

  input ProductoInput {
    nombre: String!
    descripcion: String
    cantidad_venta: Int
    coste: Float
    precio: Float
    impuesto: Float
    unidad_medida: UnidadMedida
    codigo_barra: String
    stock_minimo: Int
    stock_bodega: Int
    tipo_producto: TipoProducto
    estado_inv: EstadoInventario
    proveedores: [ID]!
    multiplicador_hijos: Int
    imagen: String
    orden: Int
    mostrar_caja: Boolean!
    color: String
  }
  type ProductoResponse {
    success: Boolean!
    message: String
    object: Producto
  }
  type ProductoDelResponse {
    success: Boolean!
    message: String
  }

  enum UnidadMedida {
    UND
    KG
    G
    ML
    LB
  }
  enum TipoProducto {
    CONSUMO_INTERNO
    VENTA
    AMBOS
    ELABORADO
  }
  enum EstadoInventario {
    NO_INVENTARIABLE
    BODEGA
    SALON_BODEGA
    SALON
  }
`;

module.exports = productos;
