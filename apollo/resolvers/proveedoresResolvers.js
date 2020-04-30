import {
  getProveedor,
  getProveedores,
  addProveedor,
  modProveedor,
  delProveedor,
} from "../Functions/proveedoresFunctions";

export const proveedoresResolver = {
  Query: {
    proveedores: async (_, __) => {
      return await getProveedores();
    },
    proveedor: async (_, { id }) => {
      return await getProveedor({ id });
    },
  },
  Mutation: {
    addProveedor: async (_, { input }) => {
      return await addProveedor({ input });
    },
    modProveedor: async (_, { id, input }) => {
      return await modProveedor({ id, input });
    },
    delProveedor: async (_, { id }) => {
      return await delProveedor({ id });
    },
  },
};
