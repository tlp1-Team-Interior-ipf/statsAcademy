export const authService = {
    login: async (credentials) => {
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        
        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data;
    },
    
    logout: () => {
        localStorage.removeItem('token');
    },
    
    getToken: () => {
        return JSON.parse(localStorage.getItem('token'));
    },

    setToken: (data) => {
        localStorage.setItem('token', JSON.stringify(data));
    },

    removeToken: () => {
        localStorage.removeItem('token');
    }
};