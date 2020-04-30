import {
  getCategoria,
  getCategorias,
  addCategoria,
  modCategoria,
  delCategoria,
} from "../Functions/categoriasFunctions";

export const categoriasResolver = {
  Query: {
    categorias: async (_, __, ctx) => {
      return await getCategorias();
    },
    categoria: async (_, { id }, ctx) => {
      return await getCategoria({ id });
    },
  },
  Mutation: {
    addCategoria: async (_, { input }, ctx) => {
      return await addCategoria({ input });
    },
    modCategoria: async (_, { id, input }, ctx) => {
      return await modCategoria({ id, input });
    },
    delCategoria: async (_, { id }, ctx) => {
      return await delCategoria({ id });
    },
  },
};
