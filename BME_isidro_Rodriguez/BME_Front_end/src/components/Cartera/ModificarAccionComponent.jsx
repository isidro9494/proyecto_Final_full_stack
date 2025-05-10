import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editarAccion } from '../../core/services/accionFetch';
import { modificarAccion } from './CarteraActions';
import styles from "../../assets/styles/Modificar.module.css"

const ModificarAccionComponent = ({ accion, cambiarPagina }) => {
    const [formData, setFormData] = useState({
        _id: accion._id || '',
        nombreInversion: accion.nombreInversion || '',
        fechaDeCompra: accion.fechaDeCompra || '',
        NumeroAcciones: accion.NumeroAcciones || 0,
        Precio: accion.Precio || 0,
        costoInversion: accion.costoInversion || 0,
        valorActual: accion.valorActual || 0,
    });

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const actualizaAccion = await editarAccion(formData);
            dispatch(modificarAccion(formData._id, actualizaAccion));
            cambiarPagina('cartera');
        } catch (error) {
            console.error('Error updating acción:', error);
        }
    };

    const handleCancelar = () => {
        cambiarPagina('cartera');
    };

    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Editar Acción</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Nombre EMPRESA:</label>
                <input type="text" name="nombreInversion" className={styles.input} value={formData.nombreInversion} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Fecha de adquisición:</label>
                <input type="date"  name="fechaDeCompra" className={styles.input} value={formData.fechaDeCompra.split('T')[0]} onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Precio:</label>
                <input  type="number" step="0.01" name="Precio" className={styles.input} value={formData.Precio}  onChange={handleInputChange} />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Número de acciones:</label>
                <input type="number" name="NumeroAcciones" className={styles.input}value={formData.NumeroAcciones} onChange={handleInputChange} />
            </div>
            <div className={styles.buttonGroup}>
                <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={handleCancelar}>Cancelar</button>
                <button type="submit"  className={`${styles.button} ${styles.saveButton}`}>Guardar</button>
            </div>
        </form>
    </div>
);
};

export default ModificarAccionComponent;