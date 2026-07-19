import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const submitComplaint = async (userId, complaintData) => {
    try {
        const response = await api.post('/complaints/submit', complaintData, {
            headers: { 'user-id': userId }
        });
        return response.data;
    } catch (error) {
        console.error("Error submitting complaint:", error);
        throw error;
    }
};

export const getAllComplaints = async () => {
    try {
        const response = await api.get('/complaints/all');
        return response.data;
    } catch (error) {
        console.error("Error fetching complaints:", error);
        throw error;
    }
};

export default api;