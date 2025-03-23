import React, { useState } from 'react';
import LoginPage from '../../pages/LoginPage';
import ContactoPage from '../../pages/ContactoPage';
import { useDispatch } from 'react-redux';
import { doLogOutAction } from '../Login/LoginAction';
import IbexPage from '../../pages/IbexPage';
import DetalleComponent from '../Lista/DetalleComponent';
import CarteraPage from '../../pages/CarteraPage';
import RegistrarAccionComponent from '../Cartera/RegistrarAccionComponent';
import ModificarAccionComponent from '../Cartera/ModificarAccionComponent';
import PerfilPage from '../../pages/PerfilPage';



const LayoutComponent = ({ children }) => {
  const [paginaActual, setPaginaActual] = useState('inicio');
  const [accionSeleccionada, setAccionSeleccionada] = useState(null);
  const dispatch = useDispatch();
  

  const cambiarPagina = (pagina, accion=null) => {
    setPaginaActual(pagina);
    setAccionSeleccionada(accion); 
  };
  const cerrarSesion = () => {
    dispatch(doLogOutAction())
  };
  const renderizarContenido = () => {
    switch (paginaActual) {
      case 'inicio':
        return children; 
      case 'contacto':
        return <ContactoPage cambiarPagina={cambiarPagina} />;
      case 'login':
        return <LoginPage/>;
        case 'ibex':
        return <IbexPage cambiarPagina={cambiarPagina}/>;
        case 'detalle':
          return <DetalleComponent cambiarPagina={cambiarPagina}/>;
          case 'cartera': 
          return <CarteraPage cambiarPagina={cambiarPagina} />;
          case 'perfil': 
          return <PerfilPage cambiarPagina={cambiarPagina} />;
          case 'añadirAccion': 
          return <RegistrarAccionComponent cambiarPagina={cambiarPagina} />
          case 'modificarAccion': 
          return <ModificarAccionComponent  accion={accionSeleccionada} cambiarPagina={cambiarPagina} />
        
      default:
        return children;
    }
  };
  return (
    <div>
      <header className="header">
        <h1>BME</h1>
        <nav className="nav">
          <button onClick={() => cambiarPagina('inicio')} className="nav-button">
            Inicio
          </button>
          <button onClick={() => cambiarPagina('ibex')} className="nav-button">
            IBEX
          </button>
          <button onClick={() => cambiarPagina('cartera')} className="nav-button">
            Cartera
          </button>
          <button onClick={() => cambiarPagina('perfil')} className="nav-button">
            Perfil
          </button>
          <button onClick={cerrarSesion} className="nav-button">
            Cerrar Sesión
          </button>
        </nav>
      </header>
      <main className="main-content">
      {renderizarContenido()} 
      </main>
      <footer className="footer">
        <div className="footer-content">
          <div className="contact-info">
            <button onClick={() => cambiarPagina('contacto')} className="nav-button">
              Contacto
            </button>
          </div>
          <div className="social-media">
            <h3>Síguenos</h3>
            <div className="social-links">
              <a href="https://facebook.com">Facebook</a>
              <a href="https://twitter.com">Twitter</a>
              <a href="https://linkedin.com">LinkedIn</a>
            </div>
          </div>
        </div>
        <p className="copyright">&copy; 2025 Bolsa de Valores. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LayoutComponent;