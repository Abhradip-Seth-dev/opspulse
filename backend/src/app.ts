import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import prisma from './lib/prisma.js'

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

app.get("/health/db", async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
  
      res.status(200).json({
        status: "ok",
        database: "connected",
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Database health check failed:", error);
  
      res.status(503).json({
        status: "error",
        database: "disconnected",
      });
    }
  });
export default app;