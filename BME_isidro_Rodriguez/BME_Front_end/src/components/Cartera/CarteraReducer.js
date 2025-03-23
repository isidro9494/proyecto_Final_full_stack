import { ANADIR_ACC, ELIMINAR_ACC, LOAD_ACCION, MODIFY_ACC } from "./CarteraActions"

const initialState = {
acciones: []
}

const accionesReducer = (state = initialState,action)=>{
switch(action.type){
    case LOAD_ACCION:
        return{
            ...state,
            acciones:action.payload
        }
    case ANADIR_ACC:
        return{
            ...state,
            acciones:[...state.acciones,action.payload],
        };
        case ELIMINAR_ACC:
            return{
                ...state,
                acciones:state.acciones.filter((accion)=>accion.id !== action.payload),
            };
            case MODIFY_ACC:
                return{
                    ...state,
                    acciones:state.acciones.map((accion)=>accion.id === action.payload.id ? { ...accion, ...action.payload.nuevosDatos } : accion)
                }
                default:
                    return state
}
}
export default accionesReducer;