export const LOAD_DATA = "LOAD_DATA";
export const SET_SELECTION = "SET_SELECTION"

export const loadIndex= (acciones)=>{
    return {
        type:LOAD_DATA,
        payload:acciones
    }
}

export const seleccionarAcciones = (acciones)=>{
    return{
        type:SET_SELECTION,
        payload:acciones
    }
}