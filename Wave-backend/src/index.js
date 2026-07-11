import mongoose from "mongoose";
import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import http from "http";
import { Server } from "socket.io";
import { initializeSocket } from "./socket/socket.js";

connectDB()
    .then(() => {
        const server = http.createServer(app);
        const io = new Server(server, {
            cors: {
                origin: process.env.CORS_ORIGIN,
                credentials: true,
            },
        });
        initializeSocket(io);
        server.listen(process.env.PORT || 3000, () => {
            console.log(
                `Server is listening at port ${process.env.PORT}`
            );
        });

    })
    .catch((err) => {
        console.log(`Mongo Atlas connection failed! Error:${err}`);
    });