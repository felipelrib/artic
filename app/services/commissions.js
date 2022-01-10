import api from './api.js';

const createCommission = async (params) => {
    let commission = null;
    const response = await api.post(`/commissions`, params);
    if (response.data) {
        commission = response.data;
    }
    return commission;
}

const getRequestedCommissions = async (username) => {
    let commissions = [];
    const response = await api.get(`/commissions?requester.Username=${username}`);
    if (Array.isArray(response.data)) {
        commissions = response.data;
    }
    return commissions;
}

const getReceivedCommissions = async (username) => {
    let commissions = [];
    const response = await api.get(`/commissions?executor.Username=${username}`);
    if (Array.isArray(response.data)) {
        commissions = response.data;
    }
    return commissions;
}

const updateCommissionImage = async (image, commission) => {
    return await api.put(`/commissions/${commission.id}`, {artwork: image.id});
}

const acceptCommission = async (id) => {
    return await api.put(`/commissions/${id}`, {accepted: true});
}

const rejectCommission = async (id) => {
    return await api.put(`/commissions/${id}`, {accepted: false});
}

export { createCommission, getRequestedCommissions, getReceivedCommissions, updateCommissionImage, acceptCommission, rejectCommission };
