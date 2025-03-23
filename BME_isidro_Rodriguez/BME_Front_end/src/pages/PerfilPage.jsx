import React, { useState } from 'react';
import { updateProfilePicture, updatePassword } from '../core/services/loginFetch'; // Asegúrate de importar updatePassword

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
        <div>
            <h1>Perfil de Usuario</h1>

            {/* Cambiar foto de perfil */}
            <div>
                <h2>Cambiar Foto de Perfil</h2>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpdateProfilePicture}>Actualizar Foto</button>
            </div>

            {/* Cambiar contraseña */}
            <div>
                <h2>Cambiar Contraseña</h2>
                <input
                    type="password"
                    placeholder="Contraseña actual"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={handleUpdatePassword}>Actualizar Contraseña</button>
            </div>

            {/* Mostrar mensajes de éxito/error */}
            {message && <p>{message}</p>}

            {/* Botón para volver al inicio */}
            <button onClick={() => cambiarPagina('inicio')} style={{ marginTop: '20px' }}>
                Volver al Inicio
            </button>
        </div>
    );
}; // Aquí se cerró correctamente el componente PerfilPage

export default PerfilPage;

