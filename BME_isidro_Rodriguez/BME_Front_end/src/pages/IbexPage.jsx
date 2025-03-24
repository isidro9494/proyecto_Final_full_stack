import React, { useEffect, useState } from 'react'
import { getAcciones } from '../core/services/listaFetch';
import { useDispatch, useSelector } from 'react-redux';
import { loadIndex,seleccionarAcciones} from '../components/Lista/ListaActions';
import styles from '../assets/styles/Ibex.module.css'
const IbexPage = ({ cambiarPagina }) => {
 const{acciones} = useSelector((state)=>state.listaAccionesReducer)
 const dispatch = useDispatch();
 const [error, setError] = useState(null);

 const loadAccionesList = async () => {
    try {
      const accionesList = await getAcciones();
      dispatch(loadIndex(accionesList));
    } catch (error) {
      console.error("Error al cargar las acciones:", error);
      setError("Error al cargar las acciones. Inténtalo de nuevo más tarde.");
    }
  };

  const handleDetail = (accion) => {
    dispatch(seleccionarAcciones(accion)); 
    cambiarPagina('detalle'); 
  };

    useEffect(() => {
        loadAccionesList();
    }, []);
  return (
    <div className={styles["ibex-container"]}>
      <div className={styles["ibex-header"]}>
        <h1 className={styles["ibex-title"]}>Listado del IBEX 35</h1>
        <button 
          className={styles["back-button"]} 
          onClick={() => cambiarPagina('inicio')}
        >
          Volver al Inicio
        </button>
      </div>
      
      <div className={styles["actions-container"]}>
        {acciones && acciones.length > 0 ? (
          acciones.map((accion) => (
            <div className={styles["stock-card"]} key={accion._id}>
              <div className={styles["stock-header"]}>
                <span className={styles["stock-name"]}>{accion.nombre}</span>
                <span className={styles["stock-symbol"]}>{accion.simbolo}</span>
              </div>
              
              <div className={styles["stock-price"]}>{accion.precio} €</div>
              
              <div className={styles["stock-detail"]}>
                <span className={styles["detail-label"]}>Sector:</span>
                <span className={styles["detail-value"]}>{accion.sector}</span>
              </div>
              
              <div className={styles["stock-detail"]}>
                <span className={styles["detail-label"]}>BPA:</span>
                <span className={styles["detail-value"]}>{accion.bpa} €</span>
              </div>
              
              <div className={styles["stock-detail"]}>
                <span className={styles["detail-label"]}>PER:</span>
                <span className={styles["detail-value"]}>{accion.per}</span>
              </div>
              
              <div className={styles["stock-detail"]}>
                <span className={styles["detail-label"]}>Capitalización:</span>
                <span className={styles["detail-value"]}>
                  {new Intl.NumberFormat('es-ES').format(accion.capitalizacion)} M€
                </span>
              </div>
              
              <button 
                className={styles["detail-btn"]} 
                onClick={() => handleDetail(accion)}
              >
                Ver Detalles
              </button>
            </div>
          ))
        ) : (
          <span className={styles["loading-text"]}>... loading</span>
        )}
      </div>
    </div>
  );
};

export default IbexPage