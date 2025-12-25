import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mainRouter from './routes/Index.js';
import connectDB from './db.js';

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/',mainRouter);

app.listen(3000,()=>{
    console.log("Server Started!")
})