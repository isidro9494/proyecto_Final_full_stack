
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { eliminarAccion } from '../components/Cartera/CarteraActions'; // Acción de Redux para eliminar
import { deleteAccion, getAcciones} from '../core/services/accionFetch'; // Funciones de la API

const CarteraPage = ({ accion = null,cambiarPagina }) => {
    const dispatch = useDispatch(); // Hook para despachar acciones de Redux
    const [acciones, setAcciones] = useState([]); // Estado local para las acciones
    const [loading, setLoading] = useState(true); // Estado local para la carga

    // Carga las acciones cuando el componente se monta
    useEffect(() => {
        const fetchAcciones = async () => {
            try {
                console.log('Cargando acciones...'); 
                const accionesData = await getAcciones(); 
                console.log('Datos cargados:', accionesData); 
                setAcciones(accionesData); 
            } catch (error) {
                console.error('Error al cargar las acciones:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchAcciones();
    }, []);

   
    const handleEliminarAccion = async (id) => {
      try {
        await deleteAccion(id); 
        dispatch(eliminarAccion(id)); 
        setAcciones(acciones.filter(accion => accion._id !== id)); 
      } catch (error) {
        console.error('Error al eliminar la acción:', error);
      }
    };
    if (loading) {
        return <div>Cargando...</div>; 
    }

    return (
        <div>
            <h1>Gestión de Cartera de Inversiones</h1>

         
            <button onClick={() => cambiarPagina('añadirAccion')}>Añadir Acción</button>

         
            <button onClick={() => cambiarPagina('inicio')}>Volver al Inicio</button>

            <h2>Acciones en Cartera</h2>
            <ul>
                {Array.isArray(acciones) && acciones.map((accion, index) => (
                    <li key={index}>
                        <strong>{accion.nombreInversion}</strong> - Fecha: {new Date(accion.fechaDeCompra).toLocaleDateString()}, Valor Invertido: ${accion.costoInversion}
                        <button onClick={() => handleEliminarAccion(accion._id)}>Eliminar</button>
                        <button onClick={() => cambiarPagina('modificarAccion', accion)}>Modificar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarteraPage;