import axios from 'axios';

const base_url=import.meta.env.VITE_API_URL
const api = axios.create({
    baseURL: `${base_url}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Separate instance for refreshing tokens
const refreshApi = axios.create({
    baseURL: `${base_url}/api`,
});

api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status !== 401 ||
            !originalRequest ||
            originalRequest._retry ||
            originalRequest.url?.includes('/token/refresh/')
        ) {
            return Promise.reject(error);
        }

        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            const response = await refreshApi.post(
                '/auth/token/refresh/',
                { refresh: refreshToken }
            );

            const newAccessToken = response.data.access;
            const newRefreshToken = response.data.refresh;

            localStorage.setItem('access_token', newAccessToken);

            if (newRefreshToken) {
                localStorage.setItem('refresh_token', newRefreshToken);
            }

            originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

            return api(originalRequest);
        } catch (refreshError) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            return Promise.reject(refreshError);
        }
    }
);

export default api;
