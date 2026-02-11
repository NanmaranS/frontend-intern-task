import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './Config/db.js'
import cors from "cors"
import authRoutes from './routes/authRoutes.js'
import noteRoutes from './routes/noteRoutes.js'

const app=express()
connectDB()
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/notes", noteRoutes)

const PORT=process.env.PORT ||5000
app.listen(PORT,()=>{
console.log(`server listening ${PORT}`);

})