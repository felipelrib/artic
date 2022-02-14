import api from "./api";

const createArt = async (params) => {
    let art = null;
    const response = await api.post(`/arts`, params);
    if (response.data) {
        art = response.data;
    }
    return art;
}

const deleteArt = async (art) => {
    const response = await api.delete(`/arts/${art.id}`);
    if (response.status == 200 && response.data) {
        return true;
    }
    return false;
}

const getArt = async (artId) => {
    try {
        reponse = await api.get(`/arts/${artId}`);
        if (response.status == 200 && response.data) {
            return response.data;
        }
    } catch (err) {
        return null;
    }
}

export { createArt, deleteArt, getArt };