import api from "../services/axios";

export const getConversations = async () => {
    const res = await api.get("/conversations");
    return res.data.data
}

export const createConversation = (participantId) => {
    return api.post("/conversations", {
        participantId,
    });
};