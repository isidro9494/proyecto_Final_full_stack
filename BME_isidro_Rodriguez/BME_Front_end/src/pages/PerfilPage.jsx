import React, { useState, useEffect } from 'react';
import { updateProfilePicture, updatePassword } from '../core/services/loginFetch';
import styles from "../assets/styles/Perfil.module.css";

const PerfilPage = ({ cambiarPagina }) => {
    const [file, setFile] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [token, setToken] = useState('');

    // Verificar el token al cargar el componente
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            // Solución más estable que no depende de cambiarPagina
            window.location.href = '/login';
            // O si usas react-router:
            // navigate('/login');
        } else {
            setToken(storedToken);
        }
    }, []); 
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpdateProfilePicture = async () => {
        try {
            if (!token) {
                throw new Error('No hay token de autenticación');
            }
            const response = await updateProfilePicture(file, token); // Pasa el token aquí
            setMessage('Foto de perfil actualizada correctamente');
            setIsError(false);
        } catch (error) {
            setMessage(error.message);
            setIsError(true);
        }
    };
    
    const handleUpdatePassword = async () => {
        try {
            if (!token) {
                throw new Error('No hay token de autenticación');
            }
            const response = await updatePassword(currentPassword, newPassword, token); // Pasa el token aquí
            setMessage('Contraseña actualizada correctamente');
            setIsError(false);
        } catch (error) {
            setMessage(error.message);
            setIsError(true);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Perfil de Usuario</h1>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Cambiar Foto de Perfil</h2>
                <div className={styles.formGroup}>
                    <input 
                        type="file" 
                        className={styles.fileInput}
                        onChange={handleFileChange} 
                    />
                    <button 
                        className={`${styles.button} ${styles.primaryButton}`}
                        onClick={handleUpdateProfilePicture}
                    >
                        Actualizar Foto
                    </button>
                </div>
            </div>
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Cambiar Contraseña</h2>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Contraseña actual:</label>
                    <input 
                        type="password" 
                        className={styles.input} 
                        placeholder="Ingresa tu contraseña actual" 
                        value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Nueva contraseña:</label>
                    <input 
                        type="password" 
                        className={styles.input} 
                        placeholder="Ingresa tu nueva contraseña" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button 
                    className={`${styles.button} ${styles.primaryButton}`}
                    onClick={handleUpdatePassword}
                >
                    Actualizar Contraseña
                </button>
            </div>

            {message && (
                <div className={`${styles.message} ${isError ? styles.errorMessage : styles.successMessage}`}>
                    {message}
                </div>
            )}

            <button 
                className={`${styles.button} ${styles.secondaryButton}`}
                onClick={() => cambiarPagina('inicio')}
            >
                Volver al Inicio
            </button>
        </div>
    );
};

export default PerfilPage;

