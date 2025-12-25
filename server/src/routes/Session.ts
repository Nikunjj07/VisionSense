import express, { type Request, type Response } from 'express';
import axios from 'axios';
import { Session, Attendance, Attention } from '../models/index.js';
import { authMiddleware, type AuthRequest } from '../middleware/auth.js';
import { PYTHON_BACKEND_URL } from '../utils/constants.js';
import { z } from 'zod';

const router = express.Router();

// Schema for starting session
const startSessionSchema = z.object({
    classId: z.string(),
    duration: z.number()
});

// POST /startSession - Start monitoring session
router.post('/startSession', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const validatedData = startSessionSchema.parse(req.body);
        const userId = req.userId;

        // Ensure userId exists (authMiddleware guarantees this)
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'User ID not found'
            });
        }

        // Create session record
        const session = await Session.create({
            userId,
            classId: validatedData.classId,
            startAt: new Date(),
            duration: validatedData.duration,
            status: 'active'
        });

        try {
            // Send request to Python backend to start monitoring
            await axios.post(`${PYTHON_BACKEND_URL}/start-session`, {
                sessionId: session._id.toString(),
                classId: validatedData.classId,
                duration: validatedData.duration
            });

            res.status(201).json({
                success: true,
                message: 'Session started successfully',
                session: {
                    id: session._id,
                    classId: session.classId,
                    startAt: session.startAt,
                    duration: session.duration,
                    status: session.status
                }
            });
        } catch (pythonError: any) {
            // Update session status to failed if Python backend fails
            session.status = 'cancelled';
            await session.save();

            return res.status(500).json({
                success: false,
                message: 'Failed to start monitoring session',
                error: pythonError.message
            });
        }
    } catch (error) {
        throw error;
    }
});

// GET /endSession - End session and fetch data
router.get('/endSession', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.query;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: 'sessionId query parameter is required'
            });
        }

        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: 'Session not found'
            });
        }

        if (session.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: 'Session is not active'
            });
        }

        try {
            // Fetch data from Python backend
            const response = await axios.get(`${PYTHON_BACKEND_URL}/end-session`, {
                params: { sessionId }
            });

            const { attentionData } = response.data;

            // Process attention data and create attendance records
            const attendanceRecords = [];
            const today = new Date();

            for (const record of attentionData) {
                // Save attention data
                await Attention.create({
                    studentId: record.studentId,
                    classId: session.classId,
                    date: today,
                    time: record.time,
                    focusPercent: record.focusPercent
                });

                // Calculate average focus for attendance
                // If attention_percent > 60, attendance = true
                const isPresent = record.focusPercent > 60;

                // Check if attendance record already exists for today
                const existingAttendance = await Attendance.findOne({
                    studentId: record.studentId,
                    classId: session.classId,
                    date: {
                        $gte: new Date(today.setHours(0, 0, 0, 0)),
                        $lt: new Date(today.setHours(23, 59, 59, 999))
                    }
                });

                if (!existingAttendance) {
                    const attendance = await Attendance.create({
                        studentId: record.studentId,
                        classId: session.classId,
                        date: today,
                        isPresent
                    });
                    attendanceRecords.push(attendance);
                }
            }

            // Update session
            session.endAt = new Date();
            session.status = 'completed';
            await session.save();

            res.status(200).json({
                success: true,
                message: 'Session ended successfully',
                session: {
                    id: session._id,
                    classId: session.classId,
                    startAt: session.startAt,
                    endAt: session.endAt,
                    status: session.status
                },
                recordsCreated: {
                    attendance: attendanceRecords.length,
                    attention: attentionData.length
                }
            });
        } catch (pythonError: any) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch session data from monitoring system',
                error: pythonError.message
            });
        }
    } catch (error) {
        throw error;
    }
});

export default router;
