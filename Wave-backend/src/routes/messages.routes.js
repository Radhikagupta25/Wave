import { Router } from "express";
import {
    sendMessage,
    getMessages,
    markMessagesAsSeen
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", sendMessage);

router.get("/:conversationId", getMessages);

router.patch("/:conversationId/seen",markMessagesAsSeen);

export default router;