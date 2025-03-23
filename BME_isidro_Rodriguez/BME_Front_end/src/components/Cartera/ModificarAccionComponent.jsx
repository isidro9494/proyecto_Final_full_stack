import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editarAccion } from '../../core/services/accionFetch';
import { modificarAccion } from './CarteraActions';


const ModificarAccionComponent = ({ accion, cambiarPagina }) => {
    const [formData, setFormData] = useState({ ...accion });
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
            dispatch(modificarAccion(formData.id, actualizaAccion));
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
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Fecha de adquisición:</label>
                    <input type="date" name="fechaAdquisicion" value={formData.fechaAdquisicion} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Precio:</label>
                    <input type="text" name="precio" value={formData.precio} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Número de acciones:</label>
                    <input type="text" name="acciones" value={formData.acciones} onChange={handleInputChange} />
                </div>
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleCancelar}>Cancelar</button>
            </form>
        </div>
    );
};

export default ModificarAccionComponent;