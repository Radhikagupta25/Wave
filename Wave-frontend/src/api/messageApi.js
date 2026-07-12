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

export const editMessage = async (messageId, content) => {
    const { data } = await api.patch(`/messages/${messageId}`, { content });
    return data.data;
};

export const deleteMessage = async (messageId) => {
    const { data } = await api.delete(`/messages/${messageId}`);
    return data.data;
};

export const toggleReaction = async (messageId, emoji) => {
    const { data } = await api.post(`/messages/${messageId}/react`, { emoji });
    return data.data;
};

export const logCall = (conversationId, callType, status, duration) => {
    return api.post("/messages/call-log", { conversationId, callType, status, duration });
};