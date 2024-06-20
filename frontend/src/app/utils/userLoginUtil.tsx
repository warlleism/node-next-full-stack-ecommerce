import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { User } from '../types/User';

interface SubmitHandlerParams {
    data: any;
    event?: React.BaseSyntheticEvent;
    setLoading: (loading: boolean) => void;
    setUser: (user: User) => void;
}

export const handleFormSubmit = async ({ data, event, setLoading, setUser }: SubmitHandlerParams) => {
    event?.preventDefault();
    setLoading(true);

    try {
        const response = await fetch('http://localhost:3001/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.message) {
            toast(result.message);
            setLoading(false);
            return;
        }

        const expiresIn = 24 * 60 * 60 * 1000; 
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', result.token);
        localStorage.setItem('tokenExpiration', expirationDate.toString());
        setUser(result.user);

        await signIn('credentials', {
            id: result.user.id,
            token: result.token,
            name: result.user.name,
            email: result.user.email,
            callbackUrl: '/pages/home'
        });
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
};
