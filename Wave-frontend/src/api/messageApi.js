import api from "../services/axios";

export const getMessages = async (conversationId) => {
    const res = await api.get(`/messages/${conversationId}`);
    return res.data.data;
};

export const sendMessage = (data) => {
    return api.post("/messages", data);
};

export const markMessagesAsSeen = (conversationId) => {
    return api.patch(`/messages/${conversationId}/seen`);
};