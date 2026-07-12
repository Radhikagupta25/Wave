import { Router } from "express";
import {
    createOrGetConversation,
    getConversationById,
    getMyConversations,
    createGroupConversation,
    leaveGroup,
    getGroupInfo,
    isRequesterAdmin,
    makeAdmin,
    removeMember,
    addParticipants
} from "../controllers/conversation.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.post("/", createOrGetConversation);

router.get("/", getMyConversations);

router.get("/:conversationId", getConversationById);

router.post("/group", createGroupConversation);

router.patch("/leave/:conversationId", verifyJWT, leaveGroup);

router.get("/group-info/:conversationId", verifyJWT, getGroupInfo);

router.patch(
    "/make-admin/:conversationId/:userId",
    verifyJWT,
    makeAdmin
);

router.patch(
    "/remove-member/:conversationId/:userId",
    verifyJWT,
    removeMember
);

router.patch(
    "/add-participants/:conversationId",
    verifyJWT,
    addParticipants
);

export default router;