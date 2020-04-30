import {
  getProductos,
  getProducto,
  getProductosCategoria,
  getProductosProveedor,
  addProducto,
  modProducto,
  delProducto,
} from "../Functions/productosFunctions";

export const productosResolver = {
  Query: {
    productos: async (_, __) => {
      return await getProductos();
    },
    producto: async (_, { id }) => {
      return await getProducto({ id });
    },
    productosCategoria: async (_, { categoriaID }) => {
      return await getProductosCategoria({
        categoriaID,
      });
    },
    productosProveedor: async (_, { proveedorID }) => {
      return await getProductosProveedor({
        proveedorID,
      });
    },
  },
  Mutation: {
    addProducto: async (_, { categoriaID, input }) => {
      return await addProducto({ categoriaID, input });
    },
    modProducto: async (_, { id, input }) => {
      return await modProducto({ id, input });
    },
    delProducto: async (_, { id }) => {
      return await delProducto({ id });
    },
  },
};
