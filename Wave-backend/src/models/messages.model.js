import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    attachment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attachment"
    },
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
    ]

}, {
    timestamps: true
})

export const Message = mongoose.model("Message", messageSchema)