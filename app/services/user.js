import api from './api.js';

const getUser = async (username) => {
    let user = null;
    const response = await api.get(`/artic-users?Username=${username}`);
    if (Array.isArray(response.data) && response.data.length > 0) {
        user = response.data[0];
    }
    return user;
};

const createUser = async (params) => {
    let user = null;
    const response = await api.post(`/artic-users`, params);
    if (response.data) {
        user = response.data;
    }
    return user;
};

const deleteUser = async (user) => {
    const response = await api.delete(`/artic-users/${user.id}`);
    return true;
}

export { getUser, createUser, deleteUser };
