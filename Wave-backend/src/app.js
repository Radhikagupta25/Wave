import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { errorHandler } from "./middlewares/error.middleware.js";

const app=express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))
app.use(express.json({limit:"16kB"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.auth.routes.js"
import conversationRouter from "./routes/conversation.routes.js"
import messageRouter from "./routes/messages.routes.js"

//routes declaration
app.use("/api/v1",userRouter)
app.use("/api/v1/conversations", conversationRouter)
app.use("/api/v1/messages", messageRouter)
app.use(errorHandler);

export {app};