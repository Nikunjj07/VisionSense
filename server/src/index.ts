import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mainRouter from './routes/Index.js';
import connectDB from './db.js';
import { errorHandler } from './middleware/errorHandler.js';

connectDB();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());

app.use('/', mainRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server Started on port 3000!");
})