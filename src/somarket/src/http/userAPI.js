import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
};

export const check = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token is not available');
        }

        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            throw new Error('Token has expired');
        }

        const { data } = await $authHost.get('api/user/auth');

        const userData = {
            token: data.token,
            userId: decodedToken.id,
            email: decodedToken.email,
            role: decodedToken.role,
            ru1: decodedToken.ru1,
            ru2: decodedToken.ru2,
            ru3: decodedToken.ru3,
            eu1: decodedToken.eu1,
            us1: decodedToken.us1,
        };

        localStorage.setItem('token', userData.token);
        return userData;
    } catch (error) {
        console.error('Authentication check failed:', error);
        return null;
    }
};

export const changePassword = async (currentPassword, newPassword) => {
    const {data} = await $authHost.post('/api/user/change-password', { currentPassword, newPassword });
    return data;
};

export const updateNickname = async (userId, nicknames) => {
    try {
        await $authHost.put('api/user/nicknames', { userId, nicknames });
    } catch (error) {
        console.error('Ошибка при обновлении никнейма:', error);
        throw error;
    }
};