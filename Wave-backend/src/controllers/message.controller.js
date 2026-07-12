import mongoose from "mongoose";
import { Message } from "../models/messages.model.js";
import { Conversation } from "../models/coversation.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getIO } from "../socket/socket.js";
import { User } from "../models/user.auth.models.js";

const sendMessage = asyncHandler(async (req, res) => {

    const { conversationId, content, attachments = [] } = req.body;

    if (!conversationId) {
        throw new ApiError(400, "Conversation id is required");
    }

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        throw new ApiError(400, "Invalid conversation id");
    }

    const messageContent = content?.trim() || "";

    if (
        !messageContent &&
        attachments.length === 0
    ) {
        throw new ApiError(
            400,
            "Message cannot be empty"
        );
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
        content: messageContent,
        attachments,
    });

    conversation.lastMessage = message._id;
    conversation.lastMessageAt = message.createdAt;

    await conversation.save();

    const createdMessage = await Message.findById(message._id)
        .populate("sender", "fullname username avatar")
        .populate("attachments")
        .populate({
            path: "conversation",
            select: "_id participants"
        });
    const io = getIO();

    // Find out who among the participants has blocked the sender
    const participantsWithBlockLists = await User.find({
        _id: { $in: conversation.participants },
    }).select("_id blockedUsers");

    const blockedByMap = new Map(
        participantsWithBlockLists.map((u) => [
            u._id.toString(),
            u.blockedUsers?.some((id) => id.toString() === req.user._id.toString()) || false,
        ])
    );

    conversation.participants.forEach((participantId) => {
        const pid = participantId.toString();
        const hasBlockedSender = blockedByMap.get(pid);
        if (pid === req.user._id.toString() || !hasBlockedSender) {
            io.to(pid).emit("new-message", {
                conversationId,
                message: createdMessage,
            });
        }
    });

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

    const me = await User.findById(req.user._id).select("blockedUsers");

    const messages = await Message.find({
        conversation: conversationId,
    })
        .populate("sender", "fullname username avatar")
        .populate("replyTo")
        .populate("attachments")
        .sort({
            createdAt: 1,
        });

    // Hide messages from anyone I've blocked
    const visibleMessages = messages.filter(
        (msg) => !me.blockedUsers?.some(
            (blockedId) => blockedId.toString() === msg.sender._id.toString()
        )
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            visibleMessages,
            "Messages fetched successfully"
        )
    );

});

const markMessagesAsSeen = asyncHandler(async (req, res) => {
    const { conversationId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        throw new ApiError(400, "Invalid conversation id");
    }

    const unseenMessages = await Message.find({
        conversation: conversationId,
        sender: { $ne: req.user._id },
        seenBy: { $ne: req.user._id }
    }).select("_id");

    const messageIds = unseenMessages.map(m => m._id);

    if (messageIds.length > 0) {
        await Message.updateMany(
            { _id: { $in: messageIds } },
            { $push: { seenBy: req.user._id } }
        );
    }

    const io = getIO();

    io.to(conversationId).emit("messages-seen", {
        conversationId,
        userId: req.user._id,
        messageIds,
    });

    return res.status(200).json(
        new ApiResponse(200, { messageIds }, "Messages marked as seen")
    );
});


const editMessage = asyncHandler(async (req, res) => {
    const { messageId } = req.params;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new ApiError(400, "Invalid message id");
    }

    const trimmedContent = content?.trim();

    if (!trimmedContent) {
        throw new ApiError(400, "Message content cannot be empty");
    }

    const message = await Message.findById(messageId);

    if (!message) {
        throw new ApiError(404, "Message not found");
    }

    if (message.sender.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only edit your own messages");
    }

    if (message.isDeleted) {
        throw new ApiError(400, "Cannot edit a deleted message");
    }

    message.content = trimmedContent;
    message.isEdited = true;
    await message.save();

    const updatedMessage = await Message.findById(messageId)
        .populate("sender", "fullname username avatar")
        .populate("attachments")
        .populate("replyTo");

    const io = getIO();
    io.to(message.conversation.toString()).emit("message-edited", {
        conversationId: message.conversation,
        message: updatedMessage,
    });

    return res.status(200).json(
        new ApiResponse(200, updatedMessage, "Message edited successfully")
    );
});

const deleteMessage = asyncHandler(async (req, res) => {
    const { messageId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new ApiError(400, "Invalid message id");
    }

    const message = await Message.findById(messageId);

    if (!message) {
        throw new ApiError(404, "Message not found");
    }

    if (message.sender.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete your own messages");
    }

    message.content = "";
    message.attachments = [];
    message.reactions = [];
    message.isDeleted = true;
    await message.save();

    const io = getIO();
    io.to(message.conversation.toString()).emit("message-deleted", {
        conversationId: message.conversation,
        messageId: message._id,
    });

    return res.status(200).json(
        new ApiResponse(200, { messageId }, "Message deleted successfully")
    );
});

const toggleReaction = asyncHandler(async (req, res) => {
    const { messageId } = req.params;
    const { emoji } = req.body;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
        throw new ApiError(400, "Invalid message id");
    }

    if (!emoji) {
        throw new ApiError(400, "Emoji is required");
    }

    const message = await Message.findById(messageId);

    if (!message) {
        throw new ApiError(404, "Message not found");
    }

    if (message.isDeleted) {
        throw new ApiError(400, "Cannot react to a deleted message");
    }

    const existingIndex = message.reactions.findIndex(
        (r) => r.user.toString() === req.user._id.toString()
    );

    if (existingIndex !== -1) {
        const existing = message.reactions[existingIndex];
        if (existing.emoji === emoji) {
            message.reactions.splice(existingIndex, 1); 
        } else {
            existing.emoji = emoji; 
        }
    } else {
        message.reactions.push({ user: req.user._id, emoji });
    }

    await message.save();

    const updatedMessage = await Message.findById(messageId)
        .populate("reactions.user", "username fullname avatar");

    const io = getIO();
    io.to(message.conversation.toString()).emit("message-reaction", {
        conversationId: message.conversation,
        messageId: message._id,
        reactions: updatedMessage.reactions,
    });

    return res.status(200).json(
        new ApiResponse(200, { reactions: updatedMessage.reactions }, "Reaction updated")
    );
});

export {
    sendMessage,
    getMessages,
    markMessagesAsSeen,
    editMessage,
    deleteMessage,
    toggleReaction
};
