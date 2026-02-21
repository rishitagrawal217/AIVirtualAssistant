import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import geminiResponse from "./gemini.js"

const app=express()

// Update CORS for Render deployment
const allowedOrigins = [
  "http://localhost:5173",
  "https://aivirtualassistant-p0bq.onrender.com"
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

// For Render deployment
const port = process.env.PORT || 5000

app.listen(port,()=>{
    connectDb()
    console.log("server started")
})

