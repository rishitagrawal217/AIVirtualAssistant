import mongoose from "mongoose"

const connectDb=async ()=>{
    try {
        const options = {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds timeout
        }
        
        await mongoose.connect(process.env.MONGODB_URL, options)
        console.log("db connected")
    } catch (error) {
        console.log("db connection error:", error.message)
        process.exit(1)
    }
}

export default connectDb