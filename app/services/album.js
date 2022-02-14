import api from './api.js'

const getUserAlbums = async (userId) => {
    const response = await api.get(`/albums?artic_user.id=${userId}`);
    if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
    }
    return null;
};

const getAlbum = async (albumId) => {
    const response = await api.get(`/albums/${albumId}`);
    if (response.status == 200) {
        return response.data;
    }
    return null;
}

export { getUserAlbums, getAlbum };
