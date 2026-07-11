import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadAttachment } from "../controllers/attachment.controller.js";

const router = Router();

router.use(verifyJWT);

router.post(
    "/upload",
    upload.single("attachment"),
    uploadAttachment
);

export default router;