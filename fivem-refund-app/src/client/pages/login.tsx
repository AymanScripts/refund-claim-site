import React from 'react';
import { useEffect } from 'react';

const LoginPage = () => {
    useEffect(() => {
        window.location.href = '/auth/discord'; // Redirect to Discord OAuth2 login
    }, []);

    return (
        <div>
            <h1>Login</h1>
            <p>Redirecting to Discord for authentication...</p>
        </div>
    );
};

export default LoginPage;