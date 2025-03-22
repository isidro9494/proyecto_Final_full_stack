import { LOAD_DATA, SET_SELECTION } from "./ListaActions"

const initialState ={
    acciones:[],
    selectAcc:null
}

const listaAccionesReducer=(state=initialState,action)=>{
    if(action.type ===LOAD_DATA){
        return{
            ...state,
            acciones:action.payload
        }
    } if(action.type ===SET_SELECTION){
        return{
            ...state,
            selectAcc:action.payload
        }
    }else{
        return state
    }
}
export default listaAccionesReducer;