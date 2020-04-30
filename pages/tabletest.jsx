import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Layout from "../components/layout/Layout";
import CircularProgress from "@material-ui/core/CircularProgress";
import Image from "material-ui-image";

//color picker
import ColorPicker from "../components/ColorPicker";

//ACTIONS y librerias de REDUX
import { useDispatch, useSelector } from "react-redux";
import { agregarCategoriasAction } from "../redux/categoriasDuck";

/////////////////////////////////Apollo
import { withApollo } from "../apollo/client";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

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

const MaterialTableDemo = () => {
  const resp = useQuery(CRUD_CATEGORIAS);
  const dispatch = useDispatch();
  //Acceder a STATES del STORE
  const categorias = useSelector((state) => state.categorias.categorias);

  useEffect(() => {
    setState({
      ...state,
      data: categorias,
    });
  }, [categorias]);

  const [state, setState] = useState({
    columns: [
      {
        title: "Imagen",
        field: "imagen",
        grouping: false,
        editComponent: (props) => (
          <Image
            src={props.value || "/error"}
            onClick={() => {}}
            aspectRatio={1 / 1}
            imageStyle={{
              width: 80,
              height: 80,
            }}
          />
        ),
        render: (rowData) => (
          // <img src={rowData.imagen} style={{width: 50, borderRadius: '50%'}}/>
          <Image
            src={rowData.imagen || "/error"}
            onClick={() => {}}
            aspectRatio={1 / 1}
            imageStyle={{
              width: 80,
              height: 80,
            }}
          />
        ),
      },
      { title: "Nombre", field: "nombre", grouping: false },
      { title: "Descripcion", field: "descripcion", grouping: false },
      { title: "Orden", field: "orden", type: "numeric", grouping: false },
      {
        title: "Color",
        field: "color",
        grouping: false,
        editComponent: (props) => (
          <div>
            <ColorPicker
              width={20}
              height={20}
              position={"inherit"}
              color={props.value}
              cambiarColor={props.onChange}
            />
          </div>
        ),
        render: (rowData) => (
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "2px",
              background: rowData.color,
            }}
          />
        ),
      },
      { title: "Mostrar Caja", field: "mostrar_caja", type: "boolean" },
    ],
    data: [],
  });

  if (resp.loading)
    return (
      <Layout>
        <CircularProgress color="secondary" />
      </Layout>
    );
  if (resp.error)
    return (
      <Layout>
        <p>ERROR</p>
      </Layout>
    );

  if (categorias.length < 1) {
    dispatch(agregarCategoriasAction(resp.data.categorias));
  }
  if (categorias.length < 1)
    return (
      <Layout>
        <p>Not found</p>
      </Layout>
    );

  return (
    <Layout>
      <MaterialTable
        localization={{
          grouping: {
            placeholder: "Arrastra un titulo para agrupar",
          },
          body: {
            editRow: {
              deleteText:
                "Deseas Eliminar este item!, no podras recuperarlo! ???",
              cancelTooltip: "Cancelar",
              saveTooltip: "Proceder!",
            },
          },
        }}
        options={{
          exportButton: true,
          grouping: true,
          search: true,
        }}
        title="Categorias"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState((prevState) => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </Layout>
  );
};

export default withApollo(MaterialTableDemo);
