import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { eliminarAccion } from '../components/Cartera/CarteraActions';

const CarteraPage = ({ cambiarPagina }) => {
  const dispatch = useDispatch();
  const acciones = useSelector((state)=>state.acciones)
  const accionesLista = acciones || [];
  return (
    <div>
      <h1>Gestión de Cartera de Inversiones</h1>

      {/* Botón para añadir una nueva acción */}
      <button onClick={() => cambiarPagina('añadirAccion')}>Añadir Acción</button>

      {/* Botón para volver al inicio */}
      <button onClick={() => cambiarPagina('inicio')}>Volver al Inicio</button>

      {/* Lista de acciones */}
      <h2>Acciones en Cartera</h2>
      <ul>
        {accionesLista.map((accion, index) => (
          <li key={index}>
            <strong>{accion.nombre}</strong> - Fecha: {accion.fechaCompra}, Valor Invertido: ${accion.valorInvertido}
            <button onClick={() => dispatch(eliminarAccion(accion.id))}>Eliminar</button>
            <button onClick={() => cambiarPagina('modificarAccion', accion)}>Modificar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarteraPage