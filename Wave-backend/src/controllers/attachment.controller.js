import { Attachment } from "../models/attachment.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadAttachment = asyncHandler(async (req, res) => {
    const attachmentLocalPath = req.file?.path;

    if (!attachmentLocalPath) {
        throw new ApiError(400, "Attachment is required");
    }

    const uploadedFile = await uploadOnCloudinary(
        attachmentLocalPath
    );

    if (!uploadedFile) {
        throw new ApiError(
            500,
            "Error uploading attachment"
        );
    }
    const mimeType = req.file.mimetype;

    let fileType = "document";
    if (mimeType.startsWith("image/")) {
        fileType = "image";
    }
    else if (mimeType.startsWith("video/")) {
        fileType = "video";
    }
    else if (mimeType.startsWith("audio/")) {
        fileType = "audio";
    }
    const attachment = await Attachment.create({
        url: uploadedFile.secure_url,
        fileName: req.file.originalname,
        uploadedBy: req.user._id,
        size: req.file.size,
        mimeType,
        fileType,
    });
    return res.status(201).json(
        new ApiResponse(
            201,
            attachment,
            "Attachment uploaded successfully"
        )
    );
})

export {
    uploadAttachment,
};