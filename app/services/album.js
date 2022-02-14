import api from './api.js'

const getUserAlbums = async (userId) => {
    const response = await api.get(`/albums?artic_user.id=${userId}`);
    if (Array.isArray(response.data) && response.data.length > 0) {
        return response.data;
    }
    return null;
};

const getAlbum = async (albumId) => {
    try {
        const response = await api.get(`/albums/${albumId}`);
        if (response.status == 200) {
            return response.data;
        }

    } catch (err) {
        return null;
    }
}

const createAlbum = async (params) => {
    if (!params.arts || params.arts.length < 1) {
        return null;
    }
    let error = false;
    params.arts.forEach((art) => {
        if (art.artic_user.Username != params.artic_user.Username) {
            error = true;
        }
    });
    if (error == true) { return null };
    let album = null;
    const response = await api.post(`/albums`, params);
    if (response.status == 200 && response.data) {
        album = response.data;
    }
    return album;
}

const deleteAlbum = async (album) => {
    const response = await api.delete(`/albums/${album.id}`);
    if (response.status == 200 && response.data) {
        return true;
    }
    return false;
}

const removeArtFomAlbum = async (album, art) => {
    const albumArts = album.arts.map((art) => (art.id))
    if (!albumArts.includes(art.id)) {
        return null;
    }
    if (album.arts.length == 1) {
        await deleteAlbum(album);
        return null;
    }
    const newArts = album.arts.filter((art) => art.id != art.id);
    album.arts = newArts;
    const response = api.put(`/albums/${album.id}`, album);
    if (response.status == 200 && response.data) {
        return response.data;
    }
    return null
}

export { getUserAlbums, getAlbum, createAlbum, deleteAlbum, removeArtFomAlbum };
