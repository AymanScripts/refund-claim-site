import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [refunds, setRefunds] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user/me');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchRefunds = async () => {
            try {
                const response = await axios.get('/api/refunds');
                setRefunds(response.data);
            } catch (error) {
                console.error('Error fetching refunds:', error);
            }
        };

        fetchUserData();
        fetchRefunds();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {user && (
                <div>
                    <h2>Welcome, {user.username}</h2>
                    <p>Your Role: {user.role}</p>
                </div>
            )}
            <h3>Your Refunds</h3>
            <ul>
                {refunds.map(refund => (
                    <li key={refund.id}>
                        Refund ID: {refund.id} - Status: {refund.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;