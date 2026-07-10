import { Router } from "express";
import {
    sendMessage,
    getMessages,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", sendMessage);

router.get("/:conversationId", getMessages);

export default router;