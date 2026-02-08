import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const data = localStorage.getItem('Data');
            if (data) {
                const { accessToken } = JSON.parse(data);
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors and token refresh
api.interceptors.response.use(
    (response) => response.data, // Return data directly
    async (error) => {
        const originalRequest = error.config;

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
                        return api(originalRequest);
                    }
                }
            } catch (refreshError) {
                // Refresh failed, logout user
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('Data');
                    window.location.href = '/Login';
                }
            }
        }

        return Promise.reject(error.response?.data || error.message);
    }
);

export default api;
