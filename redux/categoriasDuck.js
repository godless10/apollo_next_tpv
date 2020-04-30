///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////////////////   CONSTANTES   ///////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const AGREGAR_CATEGORIAS = "AGREGAR_CATEGORIAS";
const INICIAR_CARGAR_CATEGORIA = "INICIAR_CARGAR_CATEGORIA";
const SELECCIONAR_CATEGORIA = "SELECCIONAR_CATEGORIA";
const AGREGAR_FOTO = "AGREGAR_FOTO";
const AGREGAR_COLOR = "AGREGAR_COLOR";
const ACTUALIZAR_CATEGORIAS = "ACTUALIZAR_CATEGORIAS";

const initialState = {
  categorias: [],
  categoria: {
    id: "",
    nombre: "",
    descripcion: "",
    imagen: "",
    orden: "",
    mostrar_caja: "",
    color: "",
    created: "",
    modified: "",
  },
  fotoAux: null,
  colorAux: null,
  seleccionada: false,
  loading: false,
};
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////////////////   REDUCER   //////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
export default function userReducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case ACTUALIZAR_CATEGORIAS:
      return {
        ...state,
        categorias: payload.catArray,
        categoria: payload.categoria,
        loading: false,
        fotoAux: null,
      };
    case AGREGAR_CATEGORIAS:
      return {
        ...state,
        categorias: payload,
        loading: false,
        fotoAux: null,
      };

    case SELECCIONAR_CATEGORIA:
      return {
        ...state,
        categoria: payload,
        seleccionada: true,
        loading: false,
        fotoAux: null,
      };
    case INICIAR_CARGAR_CATEGORIA:
      return {
        ...state,
        loading: true,
      };
    case AGREGAR_FOTO:
      return {
        ...state,
        fotoAux: payload,
      };
    case AGREGAR_COLOR:
      return {
        ...state,
        colorAux: payload,
      };
    default:
      return state;
  }
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////////////////   ACTIONS   //////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
export const agregarCategoriasAction = (categorias) => (dispatch, getState) => {
  dispatch({
    type: AGREGAR_CATEGORIAS,
    payload: categorias,
  });
};

export const agregarFotoAction = (file) => (dispatch, getState) => {
  //console.log(file);
  dispatch({
    type: AGREGAR_FOTO,
    payload: file,
  });
};
export const agregarColorAction = (color) => (dispatch, getState) => {
  console.log(color);
  dispatch({
    type: AGREGAR_COLOR,
    payload: color,
  });
};

export const seleccionarCategoriaAction = (categoria) => (
  dispatch,
  getState
) => {
  dispatch({
    type: INICIAR_CARGAR_CATEGORIA,
  });
  dispatch({
    type: SELECCIONAR_CATEGORIA,
    payload: categoria,
  });
};

export const modificarCategoriaAction = (categoria) => (dispatch, getState) => {
  dispatch({
    type: INICIAR_CARGAR_CATEGORIA,
  });
  dispatch({
    type: SELECCIONAR_CATEGORIA,
    payload: categoria,
  });
};

export const actualizarCategoriasAction = (categoria) => (
  dispatch,
  getState
) => {
  dispatch({
    type: INICIAR_CARGAR_CATEGORIA,
  });

  const catArray = [];
  let modificacionCategoria = false;

  if (!categoria.deleted) {
    getState().categorias.categorias.map((categoriaState) => {
      if (categoriaState.id === categoria.id) {
        modificacionCategoria = true;
        catArray.push(categoria);
      } else {
        catArray.push(categoriaState);
      }
    });

    //si no es la modificacion de una categoria es una categoria nueva
    //y por lo tanto se agrega al estado de categorias
    if (!modificacionCategoria) {
      catArray.push(categoria);
    }
  } else {
    getState().categorias.categorias.map((categoriaState) => {
      if (categoriaState.id !== categoria.id) {
        catArray.push(categoriaState);
      }
    });
  }

  dispatch({
    type: ACTUALIZAR_CATEGORIAS,
    payload: { categoria, catArray },
  });
};
