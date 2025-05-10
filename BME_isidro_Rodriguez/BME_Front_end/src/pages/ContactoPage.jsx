import React, { useState } from 'react'
import styles from "../assets/styles/ContactoPage.module.css"

const ContactoPage = ({cambiarPagina}) => {
   
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contacto</h2>
      <div className={styles.infoContainer}>
        <span className={styles.label}>Nombre del Agente:</span>
        <span className={styles.value}>Isidro</span>
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.label}>Apellidos:</span>
        <span className={styles.value}>Rodriguez Freile</span>
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.label}>Dirección:</span>
        <span className={styles.value}>calle de la Radio nº37</span>
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.label}>Ciudad:</span>
        <span className={styles.value}>Salamanca</span>
      </div>
      <div className={`${styles.infoContainer} ${styles.servicesSection}`}>
        <span className={styles.label}>Servicios:</span>
        <span className={styles.value}>Planificador financiero</span>
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.label}>Email:</span>
        <span className={styles.value}>elplanifica@gmail.com</span>
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.label}>Teléfono:</span>
        <span className={styles.value}>620387925</span>
      </div>
      <button className={styles.button} onClick={() => cambiarPagina('inicio')}>Volver al Inicio</button>
    </div>
  );
}

export default ContactoPage