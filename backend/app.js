import express from 'express'
import morgan from 'morgan'
import connectDB from './config/db.js'
import cors from 'cors'
import UserRouter from './routes/user.route.js'
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))
app.use(cors())

app.use("/api/user",UserRouter)

app.listen(3000,()=>{
  console.log("Server listening on http://localhost:3000/");
  connectDB()
})

