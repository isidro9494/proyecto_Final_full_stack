export const getAcciones = async () => {
    try {
        const response = await fetch('http://localhost:3000/indices');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las acciones:", error);
        return [];
    }
};