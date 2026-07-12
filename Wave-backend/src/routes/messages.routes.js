import { Router } from "express";
import {
    sendMessage,
    getMessages,
    markMessagesAsSeen,
    editMessage,
    deleteMessage,
    toggleReaction
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", sendMessage);

router.get("/:conversationId", getMessages);

router.patch("/:conversationId/seen", markMessagesAsSeen);

router.patch("/:messageId", verifyJWT, editMessage);

router.delete("/:messageId", verifyJWT, deleteMessage);

router.post("/:messageId/react", verifyJWT, toggleReaction);

export default router;