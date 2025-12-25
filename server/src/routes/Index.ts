import { Router } from "express";
import userRouter from './User.js';
import studentRouter from './Student.js';
import classRouter from './Class.js';
import sessionRouter from './Session.js';
import analysisRouter from './Analysis.js';

const mainRouter = Router();

// Health check endpoint
mainRouter.get('/health', (req, res) => {
    res.json({
        status: "OK"
    });
});

// API Routes
mainRouter.use('/api/auth', userRouter);
mainRouter.use('/api/student', studentRouter);
mainRouter.use('/api/class', classRouter);
mainRouter.use('/api/session', sessionRouter);
mainRouter.use('/api/analysis', analysisRouter);

export default mainRouter;