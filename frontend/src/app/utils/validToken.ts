export const getValidToken = () => {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (!token || !tokenExpiration) {
        return null;
    }

    const expirationDate = parseInt(tokenExpiration, 10);
    const currentDate = new Date().getTime();

    console.log('teste', expirationDate)
    console.log('teste', currentDate)

    if (currentDate > expirationDate) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        return null;
    }

    return token;
};
