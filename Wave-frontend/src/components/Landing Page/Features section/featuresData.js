import {
    MessageCircleMore,
    ShieldCheck,
    Users,
    Paperclip,
    Zap,
} from "lucide-react";

export const features = [
    {
        id: 1,
        title: "Real-Time Messaging",
        description:
            "Send messages instantly with typing indicators, delivery status, read receipts, replies and reactions.",
        icon: MessageCircleMore,
    },
    {
        id: 2,
        title: "Secure Authentication",
        description:
            "JWT authentication, Google OAuth, email verification and password recovery built right in.",
        icon: ShieldCheck,
    },
    {
        id: 3,
        title: "Share Everything",
        description:
            "Images, videos, voice notes, documents and files with beautiful previews and lightning-fast uploads.",
        icon: Paperclip,
    },
    {
        id: 4,
        title: "Group Conversations",
        description:
            "Create communities, manage members, assign admins and collaborate in real time.",
        icon: Users,
    },
    {
        id: 5,
        title: "Lightning Fast",
        description:
            "Powered by Socket.IO to deliver an ultra-smooth messaging experience with minimal latency.",
        icon: Zap,
    },
];