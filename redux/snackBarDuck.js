///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////////////////   CONSTANTES   ///////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

const OPEN_SNACKBAR = "OPEN_SNACKBAR";
const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";

const initialState = {
  open: false,
  severity: null,
  msg: null,
};
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////////////////   REDUCER   //////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

export default function (state = initialState, action) {
  switch (action.type) {
    case OPEN_SNACKBAR:
    case CLOSE_SNACKBAR:
      return {
        ...state,
        open: action.payload.open,
        msg: action.payload.msg,
        severity: action.payload.severity,
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

///////////////////////////////////////////////////////////FUNCIONES EXPORTABLES DE REDUX

export const openMensajeAction = (argumentos) => {
  const { msg, severity } = argumentos;
  return (dispatch) => {
    //abre el mensaje
    dispatch({
      type: OPEN_SNACKBAR,
      payload: {
        open: true,
        msg,
        severity,
      },
    });
  };
};
export const closeMensajeAction = () => {
  return (dispatch) => {
    //cierra el mensaje
    dispatch({
      type: CLOSE_SNACKBAR,
      payload: {
        open: false,
        msg: '',
        severity: 'success',
      },
    });
  };
};
