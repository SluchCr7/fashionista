import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_URL || 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // Add a timeout for professional failure handling
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('Data');
            if (data) {
                try {
                    const parsedData = JSON.parse(data);
                    const accessToken = parsedData.accessToken;
                    if (accessToken) {
                        config.headers.Authorization = `Bearer ${accessToken}`;
                    }
                } catch (e) {
                    console.error('API Context Error: Invalid storage format');
                }
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors and token refresh
api.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;

        // Connection Error / Server Down
        if (!error.response) {
            console.error('API Connectivity Error: Server is unreachable.');
            return Promise.reject({ message: 'The fashion server is currently offline. Please try again later.' });
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const data = localStorage.getItem('Data');
                if (data) {
                    const { refreshToken } = JSON.parse(data);
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/refresh`, { token: refreshToken });

                    if (res.data.success) {
                        const newData = { ...JSON.parse(data), ...res.data.data };
                        localStorage.setItem('Data', JSON.stringify(newData));

                        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.accessToken}`;
                        originalRequest.headers['Authorization'] = `Bearer ${res.data.data.accessToken}`;
                        return api(originalRequest);
                    }
                }
            } catch (refreshError) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('Data');
                    window.location.href = '/Login';
                }
            }
        }

        return Promise.reject(error.response?.data || { message: error.message });
    }
);

api.checkConnection = async () => {
    try {
        const res = await api.get('/api/health');
        return res;
    } catch (err) {
        return { success: false, message: 'Disconnected' };
    }
};

export default api;
