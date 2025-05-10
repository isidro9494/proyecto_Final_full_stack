import React from 'react'
import { useSelector } from 'react-redux';
import styles from "../../assets/styles/Detalles.module.css"

const DetalleComponent = ({ cambiarPagina }) => {
    const { selectAcc } = useSelector((state) => state.listaAccionesReducer);

    if (!selectAcc) {
      return <p>No se ha seleccionado ninguna acción.</p>;
    }
  
  return (
    <div className={styles.contenedor}>
    <h1 className={styles.titulo}>Detalles de la Acción - {selectAcc.nombre} ({selectAcc.simbolo})</h1>
    <button onClick={cambiarPagina} className={styles.botonVolver}>
      ← Volver al Listado
    </button>

    <div className={styles.detalleItem}>
      <strong>Sector:</strong>
      <span className={styles.detalleValor}>{selectAcc.sector}</span>
    </div>

    <div className={styles.precio}>
      {selectAcc.precio} €
    </div>

    <div className={styles.detalleItem}>
      <strong>Capitalización:</strong>
      <span className={styles.detalleValor}>{selectAcc.capitalizacion} M€</span>
    </div>

    <div className={styles.datoClave}>
      <p><strong>BPA (Beneficio por Acción):</strong> {selectAcc.bpa} €</p>
    </div>

    <div className={styles.datoClave}>
      <p><strong>PER (Precio/Beneficio):</strong> {selectAcc.per}</p>
    </div>
  </div>
);
};

export default DetalleComponent