import React, { useState } from 'react';

const RefundForm = () => {
    const [playerId, setPlayerId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/refunds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ playerId, amount }),
            });

            if (response.ok) {
                setMessage('Refund prepared successfully!');
                setPlayerId('');
                setAmount('');
            } else {
                setMessage('Failed to prepare refund. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Prepare Refund</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="playerId">Player ID:</label>
                    <input
                        type="text"
                        id="playerId"
                        value={playerId}
                        onChange={(e) => setPlayerId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Refund</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default RefundForm;