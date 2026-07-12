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

export const createGroupConversation = (groupData) => {
    return api.post("/conversations/group", groupData);
};

export const leaveGroup = (conversationId) =>
    api.patch(`/conversations/leave/${conversationId}`);

export const getGroupInfo = (conversationId) =>
    api.get(`/conversations/group-info/${conversationId}`);

export const makeAdmin = (conversationId, userId) =>
    api.patch(`/conversations/make-admin/${conversationId}/${userId}`);

export const removeMember = (conversationId, userId) =>
    api.patch(`/conversations/remove-member/${conversationId}/${userId}`);

export const addParticipants = (conversationId, userIds) =>
    api.patch(`/conversations/add-participants/${conversationId}`, { userIds });