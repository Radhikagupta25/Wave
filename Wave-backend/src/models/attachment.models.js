import mongoose from "mongoose";

const attachmentSchema= new mongoose.Schema({
    url: {
        type: String,
        required : true
    },
    fileName :{
        type: String,
        required : true
    },
    uploadedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    size : {
        type : Number
    },
    mimeType: {
        type: String
    },
    fileType: String
}, {
    timestamps: true
})

export const Attachment= mongoose.model("Attachment", attachmentSchema)