import gql from "graphql-tag";

export const SHOW_CATEGORIAS = gql`
query showCategorias {
  categorias {
    id
    nombre
    descripcion
    orden
    imagen
    mostrar_caja
    color
    created
    modified
  }
}
`;