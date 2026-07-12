import mongoose from "mongoose";
import { Conversation } from "../models/coversation.models.js";
import { User } from "../models/user.auth.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { getIO } from "../socket/socket.js";

const createOrGetConversation = asyncHandler(async (req, res) => {
    const { participantId } = req.body;
    if (!participantId) {
        throw new ApiError(400, "Participant id is required");
    }
    if (!mongoose.Types.ObjectId.isValid(participantId)) {
        throw new ApiError(400, "Invalid participant id");
    }
    const currentUser = req.user._id;
    if (currentUser.toString() === participantId) {
        throw new ApiError(400, "You cannot create a conversation with yourself");
    }
    const participant = await User.findById(participantId);
    if (!participant) {
        throw new ApiError(404, "User not found");
    }
    const existingConversation = await Conversation.findOne({
        isGroup: false,
        participants: {
            $all: [currentUser, participantId],
        },
    })
        .populate("participants", "-password -refreshToken")
        .populate("lastMessage");

    if (existingConversation) {
        return res.status(200).json(
            new ApiResponse(
                200,
                existingConversation,
                "Conversation already exists"
            )
        );
    }

    const conversation = await Conversation.create({
        participants: [currentUser, participantId],
    });

    const createdConversation = await Conversation.findById(conversation._id)
        .populate("participants", "-password -refreshToken");

    return res.status(201).json(
        new ApiResponse(
            201,
            createdConversation,
            "Conversation created successfully"
        )
    );
});

const getMyConversations = asyncHandler(async (req, res) => {

    const conversations = await Conversation.find({
        participants: req.user._id,
    })
        .populate("participants", "-password -refreshToken")
        .populate({
            path: "lastMessage",
            populate: {
                path: "sender",
                select: "fullname username avatar",
            },
        })
        .sort({
            lastMessageAt: -1,
        });

    return res.status(200).json(
        new ApiResponse(
            200,
            conversations,
            "Conversations fetched successfully"
        )
    );
});

const getConversationById = asyncHandler(async (req, res) => {

    const { conversationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        throw new ApiError(400, "Invalid conversation id");
    }

    const conversation = await Conversation.findById(conversationId)
        .populate("participants", "-password -refreshToken")
        .populate({
            path: "lastMessage",
            populate: {
                path: "sender",
                select: "fullname username avatar",
            },
        });

    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    if (
        !conversation.participants.some(
            (participant) =>
                participant._id.toString() === req.user._id.toString()
        )
    ) {
        throw new ApiError(
            403,
            "You are not authorized to access this conversation"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            conversation,
            "Conversation fetched successfully"
        )
    );
});
const createGroupConversation = asyncHandler(async (req, res) => {

    const { groupName, groupDescription = "", participantIds = [], groupAvatar = "" } = req.body;

    if (!groupName?.trim()) {
        throw new ApiError(400, "Group name is required");
    }

    if (!Array.isArray(participantIds) || participantIds.length < 2) {
        throw new ApiError(400, "A group needs at least 2 other participants");
    }

    const invalidId = participantIds.find(
        id => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidId) {
        throw new ApiError(400, "Invalid participant id");
    }

    const uniqueParticipants = Array.from(
        new Set([...participantIds, req.user._id.toString()])
    );

    const conversation = await Conversation.create({
        participants: uniqueParticipants,
        isGroup: true,
        groupName: groupName.trim(),
        groupDescription: groupDescription.trim(),
        groupAvatar,
        admins: [req.user._id],
    });

    const populatedConversation = await Conversation.findById(conversation._id)
        .populate("participants", "fullname username avatar");

    return res.status(201).json(
        new ApiResponse(
            201,
            populatedConversation,
            "Group created successfully"
        )
    );

});

const leaveGroup = asyncHandler(async (req, res) => {

    const { conversationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        throw new ApiError(400, "Invalid conversation id");
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    if (!conversation.isGroup) {
        throw new ApiError(400, "This is not a group conversation");
    }

    const isParticipant = conversation.participants.some(
        (p) => p.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
        throw new ApiError(403, "You are not a member of this group");
    }

    conversation.participants = conversation.participants.filter(
        (p) => p.toString() !== req.user._id.toString()
    );

    const wasAdmin = conversation.admins.some(
        (a) => a.toString() === req.user._id.toString()
    );

    conversation.admins = conversation.admins.filter(
        (a) => a.toString() !== req.user._id.toString()
    );

    if (wasAdmin && conversation.admins.length === 0 && conversation.participants.length > 0) {
        conversation.admins.push(conversation.participants[0]);
    }

    await conversation.save();

    const io = getIO();
    conversation.participants.forEach((participantId) => {
        io.to(participantId.toString()).emit("group-updated", {
            conversationId,
            type: "member-left",
            userId: req.user._id,
        });
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "Left group successfully")
    );

});

const getGroupInfo = asyncHandler(async (req, res) => {

    const { conversationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        throw new ApiError(400, "Invalid conversation id");
    }

    const conversation = await Conversation.findById(conversationId)
        .populate("participants", "fullname username avatar")
        .populate("admins", "fullname username avatar");

    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    if (!conversation.isGroup) {
        throw new ApiError(400, "This is not a group conversation");
    }

    const isParticipant = conversation.participants.some(
        (p) => p._id.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
        throw new ApiError(403, "You are not a member of this group");
    }

    return res.status(200).json(
        new ApiResponse(200, conversation, "Group info fetched successfully")
    );

});

const isRequesterAdmin = (conversation, requesterId) =>
    conversation.admins.some((a) => a.toString() === requesterId.toString());

const makeAdmin = asyncHandler(async (req, res) => {

    const { conversationId, userId } = req.params;

    if (
        !mongoose.Types.ObjectId.isValid(conversationId) ||
        !mongoose.Types.ObjectId.isValid(userId)
    ) {
        throw new ApiError(400, "Invalid id");
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    if (!conversation.isGroup) {
        throw new ApiError(400, "This is not a group conversation");
    }

    if (!isRequesterAdmin(conversation, req.user._id)) {
        throw new ApiError(403, "Only admins can promote members");
    }

    const isParticipant = conversation.participants.some(
        (p) => p.toString() === userId
    );

    if (!isParticipant) {
        throw new ApiError(400, "User is not a member of this group");
    }

    const alreadyAdmin = conversation.admins.some(
        (a) => a.toString() === userId
    );

    if (!alreadyAdmin) {
        conversation.admins.push(userId);
        await conversation.save();
    }

    const io = getIO();
    conversation.participants.forEach((participantId) => {
        io.to(participantId.toString()).emit("group-updated", {
            conversationId,
            type: "admin-added",
            userId,
        });
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "User promoted to admin")
    );

});

const removeMember = asyncHandler(async (req, res) => {

    const { conversationId, userId } = req.params;

    if (
        !mongoose.Types.ObjectId.isValid(conversationId) ||
        !mongoose.Types.ObjectId.isValid(userId)
    ) {
        throw new ApiError(400, "Invalid id");
    }

    if (userId === req.user._id.toString()) {
        throw new ApiError(400, "Use the leave group option instead");
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    if (!conversation.isGroup) {
        throw new ApiError(400, "This is not a group conversation");
    }

    if (!isRequesterAdmin(conversation, req.user._id)) {
        throw new ApiError(403, "Only admins can remove members");
    }

    conversation.participants = conversation.participants.filter(
        (p) => p.toString() !== userId
    );

    conversation.admins = conversation.admins.filter(
        (a) => a.toString() !== userId
    );

    await conversation.save();

    const io = getIO();
    conversation.participants.forEach((participantId) => {
        io.to(participantId.toString()).emit("group-updated", {
            conversationId,
            type: "member-removed",
            userId,
        });
    });
    io.to(userId).emit("group-updated", {
        conversationId,
        type: "you-were-removed",
        userId,
    });

    return res.status(200).json(
        new ApiResponse(200, {}, "Member removed from group")
    );

});

const addParticipants = asyncHandler(async (req, res) => {

    const { conversationId } = req.params;
    const { userIds } = req.body; // array of user ids to add

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        throw new ApiError(400, "Invalid conversation id");
    }

    if (!Array.isArray(userIds) || userIds.length === 0) {
        throw new ApiError(400, "At least one user id is required");
    }

    const invalidId = userIds.find((id) => !mongoose.Types.ObjectId.isValid(id));
    if (invalidId) {
        throw new ApiError(400, "Invalid user id in list");
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    if (!conversation.isGroup) {
        throw new ApiError(400, "This is not a group conversation");
    }

    const isParticipant = conversation.participants.some(
        (p) => p.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
        throw new ApiError(403, "You are not a member of this group");
    }

    const existingIds = new Set(conversation.participants.map((p) => p.toString()));
    const newIds = userIds.filter((id) => !existingIds.has(id));

    if (newIds.length === 0) {
        throw new ApiError(400, "Selected users are already in the group");
    }

    conversation.participants.push(...newIds);
    await conversation.save();

    const updatedConversation = await Conversation.findById(conversationId)
        .populate("participants", "fullname username avatar")
        .populate("admins", "fullname username avatar");

    const io = getIO();
    updatedConversation.participants.forEach((participant) => {
        io.to(participant._id.toString()).emit("group-updated", {
            conversationId,
            type: "members-added",
            userIds: newIds,
        });
    });

    return res.status(200).json(
        new ApiResponse(200, updatedConversation, "Participants added successfully")
    );

});

export {
    createOrGetConversation,
    getMyConversations,
    getConversationById,
    createGroupConversation,
    leaveGroup,
    getGroupInfo,
    isRequesterAdmin,
    makeAdmin,
    removeMember,
    addParticipants
};