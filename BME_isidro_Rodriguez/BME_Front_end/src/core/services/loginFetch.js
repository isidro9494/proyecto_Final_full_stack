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