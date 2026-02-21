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

// Update CORS for all origins (development)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:4173",
  "https://*.netlify.app",
  "https://*.vercel.app"
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

// Root route for health check
app.get("/", (req, res) => {
  res.json({ 
    message: "AI Virtual Assistant API is running!",
    status: "active",
    endpoints: {
      auth: "/api/auth",
      user: "/api/user"
    }
  })
})

// For Render deployment
const port = process.env.PORT || 5000

app.listen(port,()=>{
    connectDb()
    console.log("server started")
})

