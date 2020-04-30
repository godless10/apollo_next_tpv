import { Timestamp } from "../../firebase/firebase";
import {
  getAll_Collection,
  getDoc_Collection,
  touchDoc_Collection,
  delDoc_Collection,
} from "./sharedFunctions";


///////////////////////////////////////////////////////////////////////////OBTENER TODAS CATEGORIAS
export async function getCategorias() {
  //console.log(db);
  // let fireTime = Timestamp.fromDate(new Date());
  // console.log(fireTime);
  let args = { collection: "categorias" };
  const resp = await getAll_Collection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////OBTENER UNA CATEGORIA
export async function getCategoria({ id }) {
  let args = { collection: "categorias", id };
  const resp = await getDoc_Collection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////AGREGAR CATEGORIA
export async function addCategoria({ input }) {
  let fireTime = Timestamp.fromDate(new Date());
  let args = {
    collection: "categorias",
    inputData: input,
    model: {
      id: "",
      nombre: "",
      descripcion: "",
      imagen: "",
      orden: 1,
      mostrar_caja: true,
      color: "",
      created: fireTime,
      modified: fireTime,
    },
  };
  const resp = await touchDoc_Collection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////MODIFICAR CATEGORIA
export async function modCategoria({ id, input }) {
  let fireTime = Timestamp.fromDate(new Date());
  //Obtenemos el modelo del objeto a modificar
  let argsGet = { collection: "categorias", id };
  let model = await getDoc_Collection(argsGet);
  model.modified = fireTime;
  let args = {
    collection: "categorias",
    inputData: input,
    model,
  };
  const resp = await touchDoc_Collection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////BORRAR DOC POR ID EN CATEGORIA
export async function delCategoria({ id }) {
  let args = { collection: "categorias", id };
  const resp = await delDoc_Collection(args);
  return resp;
}
