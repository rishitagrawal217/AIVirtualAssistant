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

// Update CORS for Vercel deployment
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-url.vercel.app"  // Replace with actual frontend URL from Step 2
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

// For Vercel serverless
const port = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
  module.exports = async (req, res) => {
    await app(req, res)
  }
} else {
  app.listen(port,()=>{
    connectDb()
    console.log("server started")
  })
}

