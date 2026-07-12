import { Router } from "express";
import {
    createOrGetConversation,
    getConversationById,
    getMyConversations,
    createGroupConversation
} from "../controllers/conversation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", createOrGetConversation);

router.get("/", getMyConversations);

router.get("/:conversationId", getConversationById);

router.post("/group", createGroupConversation);

export default router;