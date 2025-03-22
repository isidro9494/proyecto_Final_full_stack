import { combineReducers } from "redux";
import loginReducer from "../../../components/Login/LoginReducer";
import listaAccionesReducer from "../../../components/Lista/ListaReducer";



const reducers = combineReducers({
 loginReducer,
 listaAccionesReducer,
})

export default reducers