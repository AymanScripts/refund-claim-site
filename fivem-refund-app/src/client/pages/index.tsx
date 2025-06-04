import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the FiveM Refund Application</h1>
            <p>Please log in using Discord to manage your refunds.</p>
            <a href="/login">Login with Discord</a>
        </div>
    );
};

export default HomePage;