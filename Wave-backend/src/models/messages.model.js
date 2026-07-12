import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    attachments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attachment",
        },
    ],
    content: {
        type: String
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    reactions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            emoji: String
        }
    ],
    seenBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    isDeleted: {
        type: Boolean,
        default: false
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    messageType: {
        type: String,
        enum: ["text", "call"],
        default: "text",
    },
    callInfo: {
        callType: {
            type: String,
            enum: ["voice", "video"],
        },
        status: {
            type: String,
            enum: ["completed", "missed", "declined", "cancelled"],
        },
        duration: {
            type: Number, 
            default: 0,
        },
    },

}, {
    timestamps: true
})
messageSchema.index({
    conversation: 1,
    createdAt: -1
});

export const Message = mongoose.model("Message", messageSchema)