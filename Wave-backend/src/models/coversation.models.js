import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    isGroup: {
        type: Boolean,
        default: false
    },
    groupName: {
        type: String
    },
    groupAvatar: {
        type: String
    },
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    lastMessageAt: {
        type: Date,
    },
}, {
    timestamps: true
})
conversationSchema.index({
    participants: 1
});

export const Conversation = mongoose.model("Conversation", conversationSchema)