import express, { type Request, type Response } from 'express';
import axios from 'axios';
import { Student, Class } from '../models/index.js';
import { authMiddleware } from '../middleware/auth.js';
import { PYTHON_BACKEND_URL } from '../utils/constants.js';
import { z } from 'zod';

const router = express.Router();

const addStudentSchema = z.object({
    spid: z.string(),
    name: z.string(),
    classId: z.string()
});

router.post('/addStudent', authMiddleware, async (req: Request, res: Response) => {
    try {
        const validatedData = addStudentSchema.parse(req.body);
        const existingStudent = await Student.findOne({ spid: validatedData.spid });
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: 'Student with this SPID already exists'
            });
        }

        const classExists = await Class.findById(validatedData.classId);
        if (!classExists) {
            return res.status(404).json({
                success: false,
                message: 'Class not found'
            });
        }


        const student = await Student.create({
            spid: validatedData.spid,
            name: validatedData.name,
            classId: validatedData.classId,
            faceEncoding: ''
        });

        await Class.findByIdAndUpdate(
            validatedData.classId,
            { $push: { students: student._id } }
        );

        res.status(201).json({
            success: true,
            message: 'Student added successfully',
            student: {
                id: student._id,
                spid: student.spid,
                name: student.name,
                classId: student.classId
            }
        });
    } catch (error) {
        throw error;
    }
});

router.post('/uploadPhotos', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { studentId, images } = req.body;

        if (!studentId || !images || !Array.isArray(images)) {
            return res.status(400).json({
                success: false,
                message: 'studentId and images array are required'
            });
        }

        // Verify student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        try {
            const response = await axios.post(
                `${PYTHON_BACKEND_URL}/encode`,
                { studentId, images }
            );

            const faceEncoding = response.data.outputFilename;

            student.faceEncoding = faceEncoding;
            await student.save();

            res.status(200).json({
                success: true,
                message: 'Face encoding saved successfully',
                student: {
                    id: student._id,
                    spid: student.spid,
                    name: student.name,
                    hasFaceEncoding: !!student.faceEncoding
                }
            });
        } catch (pythonError: any) {
            return res.status(500).json({
                success: false,
                message: 'Failed to process face encoding',
                error: pythonError.message
            });
        }
    } catch (error) {
        throw error;
    }
});

router.get('/getStudentsByClass', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { classId } = req.query;

        if (!classId) {
            return res.status(400).json({
                success: false,
                message: 'classId query parameter is required'
            });
        }

        const students = await Student.find({ classId }).select('-faceEncoding');

        res.status(200).json({
            success: true,
            count: students.length,
            students
        });
    } catch (error) {
        throw error;
    }
});

router.get('/getStudentData', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { spid } = req.query;

        if (!spid) {
            return res.status(400).json({
                success: false,
                message: 'spid query parameter is required'
            });
        }

        const student = await Student.findOne({ spid }).select('-faceEncoding').populate('classId');

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            student
        });
    } catch (error) {
        throw error;
    }
});

export default router;
