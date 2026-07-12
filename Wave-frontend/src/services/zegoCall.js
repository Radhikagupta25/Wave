import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";
import { logCall } from "../api/messageApi";

let zp = null;
let activeCall = null; 

export const setActiveCallContext = (conversationId, callType, isCaller) => {
    activeCall = { conversationId, callType, isCaller, startedAt: null };
};

const clearActiveCall = () => {
    activeCall = null;
};

export const initZegoCall = (userId, username) => {
    if (zp) return zp;

    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const appSign = import.meta.env.VITE_ZEGO_APP_SIGN;

    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        appSign,
        null,
        userId,
        username
    );

    zp = ZegoUIKitPrebuilt.create(token);

    zp.addPlugins({ ZIM });

    zp.setCallInvitationConfig({
        ringtoneConfig: {
            incomingCallUrl: "",
            outgoingCallUrl: "",
        },

        onCallInvitationEnded: (reason) => {
            if (!activeCall) return;

            const statusMap = {
                declined: "declined",
                timeout: "missed",
                cancelled: "cancelled",
                canceled: "cancelled",
                busy: "missed",
            };

            const status = statusMap[reason] || "missed";

            logCall(activeCall.conversationId, activeCall.callType, status, 0)
                .catch((err) => console.log(err));

            clearActiveCall();
        },

        onSetRoomConfigBeforeJoining: () => {
            if (activeCall) {
                activeCall.startedAt = Date.now();
            }

            return {
                onLeaveRoom: () => {
                    if (!activeCall || !activeCall.startedAt) return;

                    const durationSeconds = Math.round(
                        (Date.now() - activeCall.startedAt) / 1000
                    );

                    logCall(
                        activeCall.conversationId,
                        activeCall.callType,
                        "completed",
                        durationSeconds
                    ).catch((err) => console.log(err));

                    clearActiveCall();
                },
            };
        },
    });

    return zp;
};

export const getZegoInstance = () => zp;

export const startVoiceCall = (targetUserId, targetUserName, conversationId) => {
    if (!zp) return;
    setActiveCallContext(conversationId, "voice", true);
    zp.sendCallInvitation({
        callees: [{ userID: targetUserId, userName: targetUserName }],
        callType: ZegoUIKitPrebuilt.InvitationTypeVoiceCall,
        timeout: 60,
    }).catch((err) => console.log(err));
};

export const startVideoCall = (targetUserId, targetUserName, conversationId) => {
    if (!zp) return;
    setActiveCallContext(conversationId, "video", true);
    zp.sendCallInvitation({
        callees: [{ userID: targetUserId, userName: targetUserName }],
        callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
        timeout: 60,
    }).catch((err) => console.log(err));
};

export const startGroupCall = (participants, isVideo = true, conversationId) => {
    if (!zp) return;
    setActiveCallContext(conversationId, isVideo ? "video" : "voice", true);
    zp.sendCallInvitation({
        callees: participants.map(p => ({ userID: p._id, userName: p.username })),
        callType: isVideo
            ? ZegoUIKitPrebuilt.InvitationTypeVideoCall
            : ZegoUIKitPrebuilt.InvitationTypeVoiceCall,
        timeout: 60,
    }).catch((err) => console.log(err));
};