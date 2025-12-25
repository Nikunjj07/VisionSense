import express, { type Request, type Response } from 'express';
import { Class } from '../models/index.js';
import { authMiddleware } from '../middleware/auth.js';
import { z } from 'zod';

const router = express.Router();

const addClassSchema = z.object({
    name: z.string(),
    students: z.array(z.string()).optional().default([]),
    numberOfLectures: z.number().optional()
});

router.get('/getClasses', authMiddleware, async (req: Request, res: Response) => {
    try {
        const classes = await Class.find().populate('students');

        res.status(200).json({
            success: true,
            count: classes.length,
            classes
        });
    } catch (error) {
        throw error;
    }
});

//add object/interface for class
router.post('/addClass', authMiddleware, async (req: Request, res: Response) => {
    try {
        const validatedData = addClassSchema.parse(req.body);

        const newClass = await Class.create({
            name: validatedData.name,
            students: validatedData.students
        });

        res.status(201).json({
            success: true,
            message: 'Class created successfully',
            class: newClass
        });
    } catch (error) {
        throw error;
    }
});

export default router;
