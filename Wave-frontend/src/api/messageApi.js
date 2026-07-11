import api from "../services/axios";

export const getMessages = async (conversationId) => {
    const res = await api.get(`/messages/${conversationId}`);
    return res.data.data;
};

