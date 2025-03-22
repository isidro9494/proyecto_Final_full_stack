import React from 'react'

const CarteraPage = ({ cambiarPagina }) => {
  return (
    <div>
            <h1>Gestión de Cartera de Inversiones</h1>
            
            
            <div>
            <button onClick={() => cambiarPagina('inicio')} >Volver al Inicio</button>
            </div>
        </div>
    );
};

export default CarteraPage