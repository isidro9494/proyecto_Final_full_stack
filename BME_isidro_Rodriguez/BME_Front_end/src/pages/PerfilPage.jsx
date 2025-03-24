import React, { useState } from 'react';
import { updateProfilePicture, updatePassword } from '../core/services/loginFetch';
import styles from "../assets/styles/Perfil.module.css"

const PerfilPage = ({ cambiarPagina }) => {
    const [file, setFile] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    // Manejar la selección de archivo
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Manejar la actualización de la foto de perfil
    const handleUpdateProfilePicture = async () => {
        try {
            const response = await updateProfilePicture(file);
            setMessage('Foto de perfil actualizada correctamente');
            console.log('Respuesta del backend:', response);
        } catch (error) {
            setMessage('Error al actualizar la foto de perfil');
            console.error(error);
        }
    };

    // Manejar la actualización de la contraseña
    const handleUpdatePassword = async () => {
        try {
            const response = await updatePassword(currentPassword, newPassword);
            setMessage('Contraseña actualizada correctamente');
            console.log('Respuesta del backend:', response);
        } catch (error) {
            setMessage('Error al actualizar la contraseña');
            console.error(error);
        }
    }; // Aquí se cerró correctamente la función handleUpdatePassword

    return (
        <div className={styles.container}>
        <h1 className={styles.title}>Perfil de Usuario</h1>
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Cambiar Foto de Perfil</h2>
            <div className={styles.formGroup}>
                <input type="file" className={styles.fileInput}onChange={handleFileChange} />
                <button className={`${styles.button} ${styles.primaryButton}`}onClick={handleUpdateProfilePicture}>Actualizar Foto</button>
            </div>
        </div>
        <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Cambiar Contraseña</h2>
            <div className={styles.formGroup}>
                <label className={styles.label}>Contraseña actual:</label>
                <input  type="password" className={styles.input} placeholder="Ingresa tu contraseña actual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Nueva contraseña:</label>
                <input type="password" className={styles.input} placeholder="Ingresa tu nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            </div>
            <button className={`${styles.button} ${styles.primaryButton}`}onClick={handleUpdatePassword}>Actualizar Contraseña</button>
        </div>

       
        {message && (
            <div className={`${styles.message} ${isError ? styles.errorMessage : styles.successMessage}`}>
                {message}
            </div>
        )}

        <button className={`${styles.button} ${styles.secondaryButton}`}onClick={() => cambiarPagina('inicio')}>Volver al Inicio</button>
    </div>
);
};

export default PerfilPage;

