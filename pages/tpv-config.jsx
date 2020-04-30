import React from "react";
import TreeView from "../components/layout/TreeView";

//ACTIONS y librerias de REDUX
import { useDispatch, useSelector } from "react-redux";
import { agregarCategoriasAction } from "../redux/categoriasDuck";

/////////////////////////////////Apollo
import { withApollo } from "../apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

//Material
import CircularProgress from "@material-ui/core/CircularProgress";
import Layout from "../components/layout/Layout";
import { Divider } from "@material-ui/core";

const CRUD_CATEGORIAS = gql`
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


const TpvConfig = () => {
  const dispatch = useDispatch();
  //Acceder a STATES del STORE
  const categorias = useSelector((state) => state.categorias.categorias);

  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////
  //MANEJO TEMPORAL - CADA VEZ Q RECARGA EL COMPONENTE
  //EJECUTA UN NUEVO QUERY A APOLLO SERVER...
  const { data, loading, error } = useQuery(CRUD_CATEGORIAS);

  if (loading)
    return (
      <Layout>
        <CircularProgress color="secondary" />
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <p>ERROR</p>
      </Layout>
    );
  if (categorias.length < 1) {
    dispatch(agregarCategoriasAction(data.categorias));
  }
  if (categorias.length < 1)
    return (
      <Layout>
        <p>Not found</p>
      </Layout>
    );

  //console.log(data.categorias);
  return (
    <Layout>
      <p>Config TPV</p>
      <Divider variant="middle" />
      <TreeView />
    </Layout>
  );
};

export default withApollo(TpvConfig);
