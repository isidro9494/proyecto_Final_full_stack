import { combineReducers } from "redux";
import loginReducer from "../../../components/Login/LoginReducer";
import listaAccionesReducer from "../../../components/Lista/ListaReducer";
import accionesReducer from "../../../components/Cartera/CarteraReducer";



const reducers = combineReducers({
 loginReducer,
 listaAccionesReducer,
 accionesReducer,
})

export default reducers