export const getAcciones = async () => {
    try {
        const res = await fetch('http://localhost:3000/acciones');
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const result = await res.json();
        console.log('Respuesta del backend:', result); 
        return result; 
    } catch (error) {
        console.error('Error al obtener las acciones:', error);
        return []; 
    }
};

export const anadirAccion = async (nuevaAccion) => {
    try {
        console.log("Datos enviados al backend:", nuevaAccion); // Depuración
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
        console.log("Respuesta del backend:", result); // Depuración
        return result;
    } catch (error) {
        console.error("Error al añadir una acción en fetch:", error);
        throw error;
    }
};


export const deleteAccion = async (id) => {
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