import mongoose from "mongoose";
import { Message } from "../models/messages.model.js";
import { Conversation } from "../models/coversation.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendMessage = asyncHandler(async (req, res) => {

    const { conversationId, content } = req.body;

    if (!conversationId) {
        throw new ApiError(400, "Conversation id is required");
    }

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        throw new ApiError(400, "Invalid conversation id");
    }

    if (!content?.trim()) {
        throw new ApiError(400, "Message cannot be empty");
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    if (
        !conversation.participants.some(
            participant =>
                participant.toString() === req.user._id.toString()
        )
    ) {
        throw new ApiError(
            403,
            "You are not a participant of this conversation"
        );
    }

    const message = await Message.create({
        sender: req.user._id,
        conversation: conversationId,
        content: content.trim(),
    });

    conversation.lastMessage = message._id;
    conversation.lastMessageAt = message.createdAt;

    await conversation.save();

    const createdMessage = await Message.findById(message._id)
        .populate("sender", "fullname username avatar");

    return res.status(201).json(
        new ApiResponse(
            201,
            createdMessage,
            "Message sent successfully"
        )
    );

});

const getMessages = asyncHandler(async (req, res) => {

    const { conversationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        throw new ApiError(400, "Invalid conversation id");
    }

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
        throw new ApiError(404, "Conversation not found");
    }

    if (
        !conversation.participants.some(
            participant =>
                participant.toString() === req.user._id.toString()
        )
    ) {
        throw new ApiError(
            403,
            "You are not authorized to access these messages"
        );
    }

    const messages = await Message.find({
        conversation: conversationId,
    })
        .populate("sender", "fullname username avatar")
        .populate("replyTo")
        .sort({
            createdAt: 1,
        });

    return res.status(200).json(
        new ApiResponse(
            200,
            messages,
            "Messages fetched successfully"
        )
    );

});

export {
    sendMessage,
    getMessages,
};