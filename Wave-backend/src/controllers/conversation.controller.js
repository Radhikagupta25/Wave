import mongoose from "mongoose";
import { Conversation } from "../models/coversation.models.js";
import { User } from "../models/user.auth.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

export {
    createOrGetConversation,
    getMyConversations,
    getConversationById,
};