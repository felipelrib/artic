import api from './api.js';

const getUser = async (username) => {
    let user = null;
    const response = await api.get(`/artic-users?Username=${username}`);
    if (response.data) {
        user = response.data;
    }
    return user;
}

export { getUser };
