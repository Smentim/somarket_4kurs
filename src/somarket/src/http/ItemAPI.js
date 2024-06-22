import { $authHost, $host } from "./index";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type);
    return data;
};

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type');
    return data;
};

export const createClass = async (classe) => {
    const {data} = await $authHost.post('api/class', classe);
    return data;
};

export const fetchClasses = async () => {
    const {data} = await $host.get('api/class');
    return data;
};

export const createItems = async (item) => {
    const {data} = await $authHost.post('api/item', item);
    return data;
};

export const fetchItem = async (typeId, classId, page, limit = 5) => {
    const {data} = await $host.get('api/item', {
        params: { typeId, classId, page, limit }
    });
    return data;
};

export const fetchOnItem = async (id) => {
    const {data} = await $host.get('api/item/item/' + id);
    return data;
};

export const searchItemByName = async (name) => {
    try {
        const {data} = await $authHost.get(`api/item/search/${name}`);
        return data;
    } catch (error) {
        console.error('Ошибка при поиске предмета:', error);
        throw error;
    }
};

export const addItemToStorage = async ({ userId, itemId, price, quantity, typeId, classId, server }) => {
    try {
        const { data } = await $authHost.post('api/item/storage/add', {
            userId,
            itemId,
            price,
            quantity,
            typeId,
            classId,
            server
        });
        return data;
    } catch (error) {
        console.error('Ошибка при добавлении предмета в корзину:', error);
        throw error;
    }
};

export const fetchStorageItems = async (serverId, typeId, classId, page, limit = 10) => {
    try {
        const { data } = await $host.get(`api/item/storage/items/${serverId}`, {
            params: { typeId, classId, page, limit }
        });
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке предметов из хранилища:', error);
        throw error;
    }
};

export const fetchUserItems = async (userId) => {
    try {
        const { data } = await $host.get('api/item/user/items', {
            params: { userId }
        });
        return data;
    } catch (error) {
        console.error('Ошибка при загрузке предметов пользователя:', error);
        throw error;
    }
};

export const deleteUserItem = async (id) => {
    const { data } = await $authHost.delete('api/item/' + id);
    return data;
};

export const fetchAmmoInfos = async (itemId) => {
    try {
        const { data } = await $host.get(`api/ammo_infos/${itemId}`);
        return data;
    } catch (error) {
        console.error('Error fetching ammo_infos:', error);
        throw error;
    }
};



  
