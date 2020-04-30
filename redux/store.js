import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

//reducers
import categoriasReducer from "./categoriasDuck";
import snackBarReducer from "./snackBarDuck";
//import charsReducer, { getCharactersAction } from "./charsDuck";
//import {restoreSessionAction} from './userDuck';

//Combination of reducers
let rootReducer = combineReducers({
  categorias: categoriasReducer,
  snackbar: snackBarReducer,
});
//Store Creation
const generateStore = () => {
  let store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),

      typeof window === "object" &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  //puedo mandar a llamar ACTIONS al cargar recien el store
  //debo mandar llamar la funcion con los parametros q esta necesite
  //las funciones ACTION RETORNAN una FUNCION que requiere de
  //AL MENOS la funcion dispatch como parametro, esta funcion se la 
  //podemos pasar desde el store y asi alimentamos exitosamente
  //al return de nuestro action
  //getCharactersAction()(store.dispatch,store.getState);
  //restoreSessionAction()(store.dispatch,store.getState);
  return store;
};

export default generateStore;
