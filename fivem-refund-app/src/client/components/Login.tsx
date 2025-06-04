import React, { useState } from 'react';

const Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            const response = await fetch('/auth/discord/login', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            window.location.href = response.url;
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Login with Discord</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;