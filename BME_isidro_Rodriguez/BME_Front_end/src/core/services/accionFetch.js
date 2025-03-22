export const getAcciones = async () => {
    const res = await fetch('http://localhost:3000/acciones')
    const result = await res.json()

    return result.donuts
}

export const anadirAccion = async (nuevaAccion) => {
    try {
        console.log("Datos enviados al backend:", nuevoAccion); // LOG aquí
        const res = await fetch('http://localhost:3000/acciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaAccion),
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const result = await res.json();
        console.log("Respuesta del backend:", result); // LOG aquí
        return result.donut; 
    } catch (error) {
        console.error("Error al añadir una accion en fetch:", error); // LOG aquí
        throw error;
    }
};


export const eliminarAccion = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/acciones/${id}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        console.log('Se ha elimiado correctamente');
        return await res.json();
        
    } catch (error) {
        console.error('Fallo al eliminar la accion', error);
    }
};
export const editarAccion = async (accion) => {
    try {
        const response = await fetch(`http://localhost:3000/acciones/${accion.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accion),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la accion en el backend');
        }

        return await response.json(); 
    } catch (error) {
        console.error(error);
        throw error;
    }
};