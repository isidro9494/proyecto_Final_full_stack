import React from 'react'
import { useSelector } from 'react-redux';

const DetalleComponent = ({ cambiarPagina }) => {
    const { selectAcc } = useSelector((state) => state.listaAccionesReducer);

    if (!selectAcc) {
      return <p>No se ha seleccionado ninguna acción.</p>;
    }
  
  return (
    <div>
      <h1>Detalles de la Acción</h1>
      <button onClick={cambiarPagina}>Volver al Listado</button> 
      <div>
        <p>Nombre: {selectAcc.nombre}</p>
        <p>Símbolo: {selectAcc.simbolo}</p>
        <p>Precio: {selectAcc.precio}</p>
        <p>Sector: {selectAcc.sector}</p>
        <p>BPA: {selectAcc.bpa}</p>
        <p>PER: {selectAcc.per}</p>
        <p>Capitalización: {selectAcc.capitalizacion}</p>
      </div>
    </div>
  );
};

export default DetalleComponent