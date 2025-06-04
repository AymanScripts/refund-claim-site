import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust the base URL as needed

export const loginWithDiscord = async () => {
    window.location.href = `${API_BASE_URL}/auth/discord`;
};

export const getUserRefunds = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/refunds/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user refunds:', error);
        throw error;
    }
};

export const createRefund = async (userId, refundData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/refunds`, {
            userId,
            refundData,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating refund:', error);
        throw error;
    }
};