import React, { useState } from 'react';
import axios from 'axios';

const RefundForm = () => {
    const [playerIdentifier, setPlayerIdentifier] = useState('');
    const [refundData, setRefundData] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/refunds', {
                player_identifier: playerIdentifier,
                refund_data: refundData,
            });
            setSuccess('Refund request submitted successfully!');
        } catch (err) {
            setError('Failed to submit refund request. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="playerIdentifier">Player Identifier:</label>
                <input
                    type="text"
                    id="playerIdentifier"
                    value={playerIdentifier}
                    onChange={(e) => setPlayerIdentifier(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="refundData">Refund Data:</label>
                <textarea
                    id="refundData"
                    value={refundData}
                    onChange={(e) => setRefundData(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Submit Refund Request</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default RefundForm;