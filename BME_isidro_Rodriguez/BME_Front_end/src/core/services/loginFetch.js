export const doLoginFetch = async (username, password) => {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!res.ok) {
      const errorData = await res.json(); 
      throw new Error(errorData.message || 'Error en el login');
    }
  
    const data = await res.json();
    return data;
  };

  export const createUser = async (newUser) => {
    const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser), 
    });

    if (!res.ok) {
        const errorData = await res.json(); 
        throw new Error(errorData.message || 'Error en el registro');
    }

    const data = await res.json(); 
    return data; 
};


// Función para actualizar la foto de perfil
export const updateProfilePicture = async (file, token) => {
  const formData = new FormData();
  formData.append('profilePicture', file);

  const response = await fetch('http://localhost:3000/auth/profile/picture', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}` 
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al actualizar la foto de perfil');
  }

  return response.json();
};

export const updatePassword = async (currentPassword, newPassword, token) => {
  const response = await fetch('http://localhost:3000/auth/profile/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error al actualizar la contraseña');
  }

  return response.json();
};