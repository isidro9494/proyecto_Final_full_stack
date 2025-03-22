export const ANADIR_ACC = "ANADIR_ACC"
export const ELIMINAR_ACC = "ELIMINAR_ACC"
export const MODIFY_ACC = "MODIFY_ACC"
export const LOAD_ACCION = 'LOAD_ACCION';


export const LoadAcciones = (accion)=>({
    return: {
        type:LOAD_ACCION,
        payload:accion
    }
})
export const agregarAccion = (accion)=>({
type:ANADIR_ACC,
payload :accion,
})
export const eliminarAccion = (id)=>({
    type:ELIMINAR_ACC,
    payload :id,
    })

    export const modificarAccion= (id,nuevosDatos)=>({
        type:MODIFY_ACC,
        payload:{id:nuevosDatos},
    })