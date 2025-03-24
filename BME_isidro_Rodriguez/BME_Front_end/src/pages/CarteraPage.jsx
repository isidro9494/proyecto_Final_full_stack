
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { eliminarAccion } from '../components/Cartera/CarteraActions'; 
import { deleteAccion, getAcciones} from '../core/services/accionFetch'; 
import styles from "../assets/styles/Cartera.module.css"
const CarteraPage = ({ accion = null,cambiarPagina }) => {
    const dispatch = useDispatch(); 
    const [acciones, setAcciones] = useState([]); 
    const [loading, setLoading] = useState(true); 

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
        <div className={styles.container}>
            <h1 className={styles.title}>Gestión de Cartera de Inversiones</h1>
            <button className={styles.button} onClick={() => cambiarPagina('añadirAccion')}> Añadir Acción</button>
            <button className={`${styles.button} ${styles.secondaryButton}`}onClick={() => cambiarPagina('inicio')}>Volver al Inicio </button>
            <h2 className={styles.subtitle}>Acciones en Cartera</h2>
            <ul className={styles.list}>
                {Array.isArray(acciones) && acciones.map((accion, index) => (
                    <li className={styles.listItem} key={index}>
                        <strong className={styles.actionName}>{accion.nombreInversion}</strong>
                         - Fecha: {new Date(accion.fechaDeCompra).toLocaleDateString()},
                         Valor Invertido: ${accion.costoInversion}
                        <button className={`${styles.button} ${styles.deleteButton}`}onClick={() => handleEliminarAccion(accion._id)} >Eliminar</button>
                        <button className={`${styles.button} ${styles.editButton}`}onClick={() => cambiarPagina('modificarAccion', accion)} > Modificar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarteraPage;