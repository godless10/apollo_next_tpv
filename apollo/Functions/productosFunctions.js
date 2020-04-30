import { db, Timestamp } from "../../firebase/firebase";

///////////////////////////////////////////////////////////////////////////OBTENER TODAS PRODUCTOS
export async function getProductos() {
  let args = { collection: "productos" };
  const resp = await getAll_subCollection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////OBTENER TODAS PRODUCTOS POR CATEGORIA
export async function getProductosCategoria() {
  let args = { collection: "categorias" };
  const resp = await getAll_Collection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////OBTENER TODAS PRODUCTOS POR PROVEEDOR
export async function getProductosProveedor() {
  let args = { collection: "categorias" };
  const resp = await getAll_Collection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////OBTENER UNA PRODUCTOS
export async function getProducto({ id }) {
  let args = { collection: "productos", id };
  const resp = await getDoc_subCollection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////AGREGAR PRODUCTOS
export async function addProducto({ categoriaID, input }) {
  let fireTime = Timestamp.fromDate(new Date());
  let args = {
    collection: {
      col1: "categorias",
      docID: categoriaID,
      col2: "productos",
    },
    inputData: input,
    model: {
      id: "",
      nombre: "",
      descripcion: "",
      cantidad_venta: 0,
      coste: 0,
      precio: 0.0,
      impuesto: 0.0,
      fecha_creacion: fireTime,
      ultimo_movimiento: fireTime,
      unidad_medida: "",
      codigo_barra: "",
      stock_minimo: 0,
      stock_bodega: 0,
      tipo_producto: "",
      estado_inv: "",
      proveedores: [],
      multiplicador_hijos: 1,
      imagen: "",
      orden: 1,
      mostrar_caja: true,
      color: "",
    },
  };
  const resp = await addProd(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////MODIFICAR PRODUCTOS
export async function modProducto({ id, categ }) {
  let fireTime = Timestamp.fromDate(new Date());
  //Obtenemos el modelo del objeto a modificar
  let argsGet = { collection: "categorias", id };
  let model = await getDoc_Collection(argsGet);
  model.modified = fireTime;
  let args = {
    collection: "categorias",
    inputData: categ,
    model,
  };
  const resp = await touchDoc_Collection(args);
  return resp;
}
///////////////////////////////////////////////////////////////////////////BORRAR DOC POR ID EN PRODUCTO
export async function delProducto({ id }) {
  let args = { collection: "categorias", id };
  const resp = await delDoc_Collection(args);
  return resp;
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////   FUNCTIONS AUX   /////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const addProd = async ({ model, inputData, collection }) => {
  let res = checkObject(model, inputData);
  let { col1, col2, docID } = collection;
  try {
    if (!res.proveedores[0]) {
      return {
        success: false,
        message: `ERROR agregando ${col2}: Debe tener proveedor(es)`,
        object: inputData,
      };
    }
    if (!res.id) {
      res.id = `${col2}.${res.nombre.replace(/\s/g, "_")}.${uuidv4()}`;
    }

    //fullproveedores es una lista de los proveedore completos
    //que encontramos en el array de IDs q envia el cliente
    let fullProveedores = [];

    //for que recorre el de proveedores de forma sincrona
    let i;
    /* eslint-disable no-await-in-loop */
    for (i = 0; i < res.proveedores.length; i++) {
      //resp contendra el proveedor encontrado con el ID
      //correspondiente del array de IDs en el producto
      const resp = await getDoc_Collection(db, {
        collection: "proveedores",
        id: res.proveedores[i],
      });
      //Si encontramos el proveedor con el ID suministrado
      if (resp.id) {
        //res es el producto que estamos insertando
        //En el proveedor valido insertaremos en el array
        //de productos el ID que corresponde a nuestro
        //producto siendo creado
        let provProds = [];
        provProds = resp.productos;
        provProds.push(res.id);

        //Creamos la propiedad que debera modificarse del objeto
        //previamente encontrado y valido
        let newProv = { productos: provProds };

        //Enviamos el objeto viejo mas la modificacion que haremos
        //a la coleccion de proveedores
        let recentProv = await touchDoc_Collection(db, {
          model: resp,
          inputData: newProv,
          collection: "proveedores",
        });
        //actualizamos nuestra lista nueva de proveedores con el
        //dato COMPLETO del proveedor devuelto como respuesta
        //a la modificacion de su lista de productos
        fullProveedores.push(recentProv.object);
      } else {
        return {
          success: false,
          message: `ERROR agregando ${col2}: Proveedor Invalido`,
          object: inputData,
        };
      }
    }

    res.proveedores = fullProveedores;
    await db.collection(col1).doc(docID).collection(col2).doc(res.id).set(res);

    return {
      success: true,
      message: `${col2} Agregad@ EXITOSAMENTE:`,
      object: res,
    };
  } catch (error) {
    return {
      success: false,
      message: `ERROR agregando ${col2}: ${error}`,
      object: inputData,
    };
  }
};
