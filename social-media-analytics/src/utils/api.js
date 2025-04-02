import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const handleError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        console.error('API Error:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
        });
        throw new Error(error.response.data.message || 'API request failed');
    } else if (error.request) {
        // The request was made but no response was received
        console.error('API Error: No response received', error.request);
        throw new Error('No response from server');
    } else {
        // Something happened in setting up the request
        console.error('API Error:', error.message);
        throw new Error('API request setup failed');
    }
};

export const fetchTopUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data.users;
    } catch (error) {
        handleError(error);
    }
};

export const fetchTrendingPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts?type=popular`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const fetchLatestPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts?type=latest`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};