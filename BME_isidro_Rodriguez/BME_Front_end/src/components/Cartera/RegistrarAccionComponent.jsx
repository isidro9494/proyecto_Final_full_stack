import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { anadirAccion } from '../../core/services/accionFetch';
import { agregarAccion } from './CarteraActions';

const RegistrarAccionComponent = ({ cambiarPagina }) => {
  const dispatch = useDispatch();

  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [fechaAdquisicion, setFechaAdquisicion] = useState('');
  const [numeroAcciones, setNumeroAcciones] = useState('');
  const [precio, setPrecio] = useState('');

  const calcularValorTotal = () => {
    const valorTotal = parseFloat(numeroAcciones) * parseFloat(precio);
    return isNaN(valorTotal) ? 0 : valorTotal;
  };

  const handleRegistrar = async () => {
    const nuevaAccion = {
      nombreInversion: nombreEmpresa, 
      fechaDeCompra: new Date(fechaAdquisicion).toISOString(), 
      NumeroAcciones: parseInt(numeroAcciones), 
      Precio: parseFloat(precio), 
      costoInversion: calcularValorTotal(), 
      valorActual: calcularValorTotal(), 
    };

    try {
      // Envía la nueva acción al backend
      const accionGuardada = await anadirAccion(nuevaAccion);
      console.log('Acción guardada en el backend:', accionGuardada);

      // Despacha la acción de Redux para actualizar el estado local
      dispatch(agregarAccion(accionGuardada));

      // Vuelve a la página de la cartera
      cambiarPagina('cartera');
    } catch (error) {
      console.error('Error al guardar la acción:', error);
    }
  };

  const handleCancelar = () => {
    cambiarPagina('cartera'); // Vuelve a la página de la cartera
  };

  return (
    <div>
      <h1>Registro de Acción</h1>
   
      <div>
        <label>Nombre de la Empresa:</label>
        <input type="text" value={nombreEmpresa} onChange={(e) => setNombreEmpresa(e.target.value)} />
      </div>
      <div>
        <label>Fecha de Adquisición:</label>
        <input type="date" value={fechaAdquisicion} onChange={(e) => setFechaAdquisicion(e.target.value)} />
      </div>
      <div>
        <label>Número de Acciones:</label>
        <input type="number" value={numeroAcciones} onChange={(e) => setNumeroAcciones(e.target.value)} />
      </div>
      <div>
        <label>Precio por Acción:</label>
        <input type="number" step="0.01" value={precio} onChange={(e) => setPrecio(e.target.value)} />
      </div>
      <div>
        <strong>Valor Total de la Inversión:</strong> ${calcularValorTotal().toFixed(2)}
      </div>
    
      <button onClick={handleRegistrar}>Registrar</button>
      <button onClick={handleCancelar}>Cancelar</button>
    </div>
  );
};

export default RegistrarAccionComponent;