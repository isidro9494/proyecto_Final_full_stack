import React, { useEffect, useState } from 'react'
import { getAcciones } from '../core/services/listaFetch';
import { useDispatch, useSelector } from 'react-redux';
import { loadIndex,seleccionarAcciones} from '../components/Lista/ListaActions';
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
    <div>
            <h1>Listado de Acciones</h1>
            <button onClick={() => cambiarPagina('inicio')}>Volver al Inicio</button>
            <div>
                {acciones && acciones.length > 0 ? (
                    acciones.map((accion) => (
                        <div key={accion._id}>
                            <p>Nombre: {accion.nombre}</p>
                            <p>Símbolo: {accion.simbolo}</p>
                            <p>Precio: {accion.precio}</p>
                            <p>Sector: {accion.sector}</p>
                            <p>BPA: {accion.bpa}</p>
                            <p>PER: {accion.per}</p>
                            <p>Capitalización: {accion.capitalizacion}</p>
                            <button onClick={() => handleDetail(accion)}>Ver Detalles</button>
                        </div>
                    ))
                ) : (
                    <span>... loading</span>
                )}
            </div>
        </div>
    );
};

export default IbexPage