import React from 'react'
import LayoutComponent from '../components/Layout/LayoutComponent'

const HomePage = ({children}) => {
  return (
    <LayoutComponent>
      <div className="home-content">
        <h1>Bienvenido a BME</h1>
        <p>Consulta las últimas cotizaciones y noticias del mercado.</p>
      </div>
    </LayoutComponent>
   
  );
};

export default HomePage