import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'


dotenv.config()

const app = express()

app.use(helmet())
app.use(express.json())
app.use(cors())

app.get('/health',(req,res)=>{
    res.status(200).json({
    status: "ok",
    service: "OpsPulse API",
    timestamp: new Date().toISOString(),
    })
})
export default app;