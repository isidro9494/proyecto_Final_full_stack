export const doLoginFetch = async (username, password) => {
    const res = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json', 
      },
      body: JSON.stringify({ username, password }),
    });
  
  
  };

export const createUser = async (newUser) => {
    const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'content-type': 'Application/json'
        },
        body: JSON.stringify({
            newUser
        })
    })
}