let io;

const onlineUsers = new Map();

export const initializeSocket = (socketServer) => {

    io = socketServer;
    io.on("connection", (socket) => {
        console.log("User Connected:", socket.id);
        socket.on("setup", (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log(
                "User Online:",
                userId
            );
        });
        socket.on("disconnect", () => {
            console.log("User Disconnected:", socket.id);
        });

    });

};

export { io, onlineUsers };