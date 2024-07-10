export const getValidToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    try {
        const response = await fetch('http://localhost:3001/valid/token', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();
        return data.token ? data.token : null;
    } catch (error) {
        console.error('Erro ao validar o token:', error);
        return null;
    }
};
