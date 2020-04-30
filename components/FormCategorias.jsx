import React, { useState, useEffect, Fragment } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
//import useUploadFile from "./useUploadFile";
import UploadFile from "./UploadFile";

//Form validation hook
import { useForm } from "react-hook-form";

//ACTIONS y librerias de REDUX
import { useDispatch, useSelector } from "react-redux";
import { actualizarCategoriasAction } from "../redux/categoriasDuck";
import { openMensajeAction } from "../redux/snackBarDuck";

//Material
import ListAltIcon from "@material-ui/icons/ListAlt";
import {
  Avatar,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Fab from "@material-ui/core/Fab";

/////////////////////////////////Apollo
import { withApollo } from "../apollo/client";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import ColorPicker from "./ColorPicker";

const fotoTemp = "/images/category.png";

const ADD_CATEG = gql`
  mutation addCategoria($input: CategoriaInput) {
    addCategoria(input: $input) {
      success
      message
      object {
        id
        nombre
        descripcion
        imagen
        mostrar_caja
        orden
        created
        modified
      }
    }
  }
`;

const DEL_CATEG = gql`
  mutation delCategoria($id: ID!) {
    delCategoria(id: $id) {
      success
      message
    }
  }
`;

const MOD_CATEG = gql`
  mutation modCategoria($id: ID!, $input: CategoriaInput) {
    modCategoria(id: $id, input: $input) {
      success
      message
      object {
        id
        nombre
        descripcion
        imagen
        mostrar_caja
        orden
        created
        modified
      }
    }
  }
`;

const UPLOAD_FILE_STREAM = gql`
  mutation SingleUploadStream($file: FileUpload!) {
    singleUploadStream(file: $file) {
      URL
    }
  }
`;

const FormCategorias = ({ cate }) => {
  const classes = useStyles();

  const [singleUploadStream] = useMutation(UPLOAD_FILE_STREAM);
  const [addCategoria] = useMutation(ADD_CATEG);
  const [modCategoria] = useMutation(MOD_CATEG);
  const [delCategoria] = useMutation(DEL_CATEG);

  //funcion dispatch
  const dispatch = useDispatch();
  //Acceder a STATES del STORE
  const categ = useSelector((state) => state.categorias.categoria);
  const fotoCateg = useSelector((state) => state.categorias.fotoAux);
  const colorCateg = useSelector((state) => state.categorias.colorAux);

  //estados locales
  const [categoria, setCategoria] = useState(cate);
  const [modificar, setModificar] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  let { id, nombre, descripcion, orden, color, created, modified } = cate;

  //variables y funciones del custom hook useForm
  const { register, handleSubmit, reset, errors, setValue } = useForm({
    defaultValues: {
      nombre,
      descripcion,
      orden,
    },
  });

  created = dayjs(categ.created).format("dddd, MMMM D YYYY, HH:mm:ss");
  modified = dayjs(categ.modified).format("dddd, MMMM D YYYY, HH:mm:ss");

  useEffect(() => {
    if (categoria !== cate) {
      setCategoria(cate);
      setValue([
        { nombre: nombre },
        { descripcion: descripcion },
        { orden: orden },
      ]);
    }

    if (cate.nueva) {
      setModificar(true);
    } else {
      setModificar(false);
    }
  }, [cate]);

  const handleChange = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };
  const clickModificar = (e) => {
    setModificar(!modificar);
    setValue([
      { nombre: categ.nombre },
      { descripcion: categ.descripcion },
      { orden: categ.orden },
    ]);
  };
  const clickBorrar = (e) => {
    Swal.fire({
      title: "Confirma la eliminacion",
      text: "Si borras la categoria, esto no podra ser revertido",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
    }).then(async (result) => {
      if (result.value) {
        let delResp = await delCategoria({ variables: { id: categoria.id } });
        if (delResp.data.delCategoria.success) {
          dispatch(
            actualizarCategoriasAction({
              id: categoria.id,
              deleted: true,
            })
          );
          setLoading(false);
        } else {
          setLoading(false);
        }

        Swal.fire(
          "Eliminada!",
          "Tu categoria fue Eliminada exitosamente.",
          "success"
        );
        router.push("/tpv-config");
      }
    });
  };
  const onSubmit = async () => {
    //console.log(categoria);
    setLoading(true);
    //identificar si seleccionamos FOTO nueva para la categoria
    if (fotoCateg) {
      const respUpload = await singleUploadStream({
        variables: { file: fotoCateg },
      });
      categoria.imagen = respUpload.data.singleUploadStream.URL.toString();
    }
    //identificar si seleccionamos COLOR nuevo para la categoria
    if (colorCateg) {
      categoria.color = colorCateg;
    }

    let categoriaInput = {
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      imagen: categoria.imagen,
      orden: parseInt(categoria.orden),
      mostrar_caja: categoria.mostrar_caja || false,
      color: categoria.color,
    };

    //Identificar si es categoria nueva o modificacion de categoria existente
    if (cate.nueva) {
      const addResp = await addCategoria({
        variables: { input: categoriaInput },
      });

      if (addResp.data.addCategoria.success) {
        dispatch(actualizarCategoriasAction(addResp.data.addCategoria.object));

        setLoading(false);
        dispatch(
          openMensajeAction({
            msg: addResp.data.addCategoria.message,
            severity: "success",
          })
        );
      } else {
        setLoading(false);
        dispatch(
          openMensajeAction({
            msg: "hubo un error AGRGANDO la categoria",
            severity: "error",
          })
        );
      }
    } else {
      const modResp = await modCategoria({
        variables: { id: categoria.id, input: categoriaInput },
      });
      //console.log(modResp);
      if (modResp.data.modCategoria.success) {
        dispatch(actualizarCategoriasAction(modResp.data.modCategoria.object));

        setLoading(false);
        dispatch(
          openMensajeAction({
            msg: modResp.data.modCategoria.message,
            severity: "success",
          })
        );
      } else {
        setLoading(false);
        dispatch(
          openMensajeAction({
            msg: "hubo un error MODIFICANDO la categoria",
            severity: "error",
          })
        );
      }
    }
  };

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Avatar
            style={style.avatar}
            className={classes.large}
            src={categ.imagen || fotoTemp}
          />
        )}
        {!cate.nueva ? (
          <Fragment>
            <Typography component="h1" variant="h5">
              {categ.nombre}
            </Typography>

            <div>
              <Typography variant="caption" display="block" gutterBottom>
                Creada: {created}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Modificada: {modified}
              </Typography>
            </div>
          </Fragment>
        ) : (
          <div>
            <Typography component="h1" variant="h5">
              Agregar Categoria
            </Typography>
          </div>
        )}
        <form
          style={style.form}
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                name="nombre"
                variant="outlined"
                fullWidth
                label="Nombre de la categoria"
                onChange={handleChange}
                inputRef={register({
                  required: "Campo REQUERIDO",
                  minLength: { value: 2, message: "El minimo requerido es 2" },
                  maxLength: {
                    value: 20,
                    message: "No puede tener mas de 20 caracteres",
                  },
                })}
                error={errors.nombre ? true : false}
                disabled={modificar ? false : true}
                helperText={
                  errors.nombre && <span>{errors.nombre.message}</span>
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="text"
                name="descripcion"
                variant="outlined"
                fullWidth
                label="Descripcion de la categoria"
                onChange={handleChange}
                inputRef={register({
                  maxLength: {
                    value: 200,
                    message: "No puede tener mas de 200 caracteres",
                  },
                })}
                error={errors.descripcion ? true : false}
                disabled={modificar ? false : true}
                helperText={
                  errors.descripcion && (
                    <span>{errors.descripcion.message}</span>
                  )
                }
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                type="number"
                name="orden"
                variant="outlined"
                fullWidth
                label="Orden"
                onChange={handleChange}
                inputRef={register({
                  required: "Campo REQUERIDO",
                  min: { value: 1, message: "El minimo requerido es 1" },
                })}
                error={errors.orden ? true : false}
                disabled={modificar ? false : true}
                helperText={errors.orden && <span>{errors.orden.message}</span>}
              />
            </Grid>

            <Grid item md={1} xs={6}>
              {modificar ? (
                <ColorPicker />
              ) : (
                <div style={style.swatch}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "2px",
                      background: categ.color,
                    }}
                  />
                </div>
              )}
            </Grid>
            <Grid item md={5} xs={6}>
              <Typography
                variant="subtitle1"
                gutterBottom
                color="inherit"
                align="left"
              >
                Mostrar en Caja
                <Checkbox
                  name="mostrar_caja"
                  disabled={modificar ? false : true}
                  checked={
                    typeof categoria.mostrar_caja !== "string"
                      ? categoria.mostrar_caja
                      : false
                  }
                  onChange={(e) => {
                    setCategoria({
                      ...categoria,
                      mostrar_caja: !categoria.mostrar_caja,
                    });
                  }}
                  color="primary"
                  label="Mostrar en Caja"
                />
              </Typography>
            </Grid>

            <Grid item md={12} xs={12}>
              {modificar ? (
                <UploadFile />
              ) : (
                <p>SUBIR una imagen haciendo click o arrastrando</p>
              )}
            </Grid>
          </Grid>

          {!cate.nueva && (
            <Grid container justify="flex-end" spacing={2}>
              <Grid item>
                <Fab color="primary" onClick={clickModificar}>
                  <BorderColorIcon />
                </Fab>
              </Grid>
              <Grid item>
                <Fab color="primary" onClick={clickBorrar}>
                  <DeleteForeverIcon />
                </Fab>
              </Grid>
            </Grid>
          )}
          <Grid container justify="center">
            <Grid item md={6} xs={12}>
              {modificar && (
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  color="primary"
                  style={style.submit}
                >
                  {cate.nueva
                    ? "Agregar Nueva Categoria"
                    : "Modificar Categoria"}
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withApollo(FormCategorias);

const style = {
  paper: {
    marginTop: 9,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginBottom: 5,
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  submit: {
    marginTop: 15,
    marginBottom: 20,
  },
  color: {
    width: "36px",
    height: "36px",
    borderRadius: "2px",
    background: `gray`,
  },
  swatch: {
    padding: "5px",
    background: "#8E898F",
    borderRadius: "1px",
    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
    display: "inline-block",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
