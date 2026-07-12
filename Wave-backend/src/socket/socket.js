let io;

const onlineUsers = new Map();

export const initializeSocket = (socketServer) => {
    io = socketServer;

    io.on("connection", (socket) => {

        socket.on("setup", (userId) => {
            socket.userId = userId;
            onlineUsers.set(userId, socket.id);
            socket.join(userId);

            socket.broadcast.emit("user-online", { userId });
            socket.emit("online-users", { userIds: Array.from(onlineUsers.keys()) });
        });

        socket.on("join-conversation", (conversationId) => {
            socket.join(conversationId);
        });

        socket.on("leave-conversation", (conversationId) => {
            socket.leave(conversationId);
        });

        socket.on("typing", ({ conversationId, userId }) => {
            socket.to(conversationId).emit("typing", { conversationId, userId });
        });

        socket.on("stop-typing", ({ conversationId, userId }) => {
            socket.to(conversationId).emit("stop-typing", { conversationId, userId });
        });

        socket.on("disconnect", () => {
            if (!socket.userId) return;

            if (onlineUsers.get(socket.userId) === socket.id) {
                onlineUsers.delete(socket.userId);
                io.emit("user-offline", { userId: socket.userId });
            }
        });

    });
};

export const getIO = () => io;

export { onlineUsers };