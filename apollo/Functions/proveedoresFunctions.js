import { Timestamp } from "../../firebase/firebase";
import {
  getAll_Collection,
  getDoc_Collection,
  touchDoc_Collection,
  delDoc_Collection,
} from "./sharedFunctions";

///////////////////////////////////////////////////////////////////////////OBTENER TODOS PROVEEDORES
export async function getProveedores() {
  let args = { collection: "proveedores" };
  const resp = await getAll_Collection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////OBTENER UN PROVEEDOR
export async function getProveedor({ id }) {
  let args = { collection: "proveedores", id };
  const resp = await getDoc_Collection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////AGREGAR PROVEEDOR
export async function addProveedor({ input }) {
  let fireTime = Timestamp.fromDate(new Date());
  let args = {
    collection: "proveedores",
    inputData: input,
    model: {
      nombre: "",
      descripcion: "",
      imagen: "",
      orden: 1,
      direccion: "",
      observaciones: "",
      telefono: {
        whatsapp: false,
        cel: null,
        fijo: null,
      },
      email: "",
      id_tributario: "",
      color: "",
      created: fireTime,
      modified: fireTime,
      productos: [],
    },
  };
  const resp = await touchDoc_Collection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////MODIFICAR PROVEEDOR
export async function modProveedor({ id, input }) {
  let fireTime = Timestamp.fromDate(new Date());

  //Obtenemos el modelo del objeto a modificar
  //En base al objeto existente que se quiere modificar
  let argsGet = { collection: "proveedores", id };
  let model = await getDoc_Collection(argsGet);
  model.modified = fireTime;
  let args = {
    collection: "proveedores",
    inputData: input,
    model,
  };
  const resp = await touchDoc_Collection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////BORRAR DOC POR ID EN CATEGORIA
export async function delProveedor({ id }) {
  let args = { collection: "proveedores", id };
  const resp = await delDoc_Collection(args);
  return resp;
}
