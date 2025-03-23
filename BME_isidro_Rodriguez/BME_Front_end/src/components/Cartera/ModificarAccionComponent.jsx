import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editarAccion } from '../../core/services/accionFetch';
import { modificarAccion } from './CarteraActions';

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
        <div>
            <h1>Editar Acción</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre EMPRESA:</label>
                    <input type="text"name="nombreInversion" value={formData.nombreInversion} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Fecha de adquisición:</label>
                    <input type="date" name="fechaDeCompra" value={formData.fechaDeCompra}onChange={handleInputChange} />
                </div>
                <div>
                    <label>Precio:</label>
                    <input type="text"name="Precio"value={formData.Precio}onChange={handleInputChange} />
                </div>
                <div>
                    <label>Número de acciones:</label>
                    <input type="text" name="NumeroAcciones"value={formData.NumeroAcciones} onChange={handleInputChange} />
                </div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleCancelar}>Cancelar</button>
            </form>
        </div>
    );
};

export default ModificarAccionComponent;