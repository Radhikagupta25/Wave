let io;

const onlineUsers = new Map();

export const initializeSocket = (socketServer) => {
    io = socketServer;

    io.on("connection", (socket) => {

        socket.on("setup", (userId) => {
            onlineUsers.set(userId, socket.id);
        });

        socket.on("join-conversation", (conversationId) => {
            socket.join(conversationId);
        });

        socket.on("leave-conversation", (conversationId) => {
            socket.leave(conversationId);
        });

        socket.on("disconnect", () => {
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    break;
                }
            }
        });

    });
};

export const getIO = () => io;

export { onlineUsers };