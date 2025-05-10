import React from 'react';
import LayoutComponent from '../components/Layout/LayoutComponent';
import styles from '../assets/styles/Layout.module.css';

const HomePage = ({children}) => {
  return (
    <LayoutComponent>
      <div className={styles.homeContent}>
        <h1>Bienvenido a BME</h1>
        <p>Consulta las últimas cotizaciones y noticias del mercado.</p>
      </div>
    </LayoutComponent>
  );
};

export default HomePage;