import express, { type Request, type Response } from 'express';
import { Student, Attendance, Attention, Class } from '../models/index.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/getClassWise', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { classId } = req.query;

        if (!classId) {
            return res.status(400).json({
                success: false,
                message: 'classId query parameter is required'
            });
        }

        // Get class data
        const classData = await Class.findById(classId).populate('students');
        if (!classData) {
            return res.status(404).json({
                success: false,
                message: 'Class not found'
            });
        }

        // Get attendance data for this class
        const attendanceData = await Attendance.find({ classId }).populate('studentId');

        // Get attention data for this class
        const attentionData = await Attention.find({ classId }).populate('studentId');

        res.status(200).json({
            success: true,
            class: classData,
            attendance: attendanceData,
            attention: attentionData,
            stats: {
                totalStudents: classData.students.length,
                totalAttendanceRecords: attendanceData.length,
                totalAttentionRecords: attentionData.length
            }
        });
    } catch (error) {
        throw error;
    }
});

// GET /getStudentWise - Get student analytics
router.get('/getStudentWise', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { spid } = req.query;

        if (!spid) {
            return res.status(400).json({
                success: false,
                message: 'spid query parameter is required'
            });
        }

        // Get student data
        const student = await Student.findOne({ spid }).populate('classId');
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        // Get attendance data for this student
        const attendanceData = await Attendance.find({ studentId: student._id });

        // Get attention data for this student
        const attentionData = await Attention.find({ studentId: student._id });

        // Calculate statistics
        const totalClasses = attendanceData.length;
        const classesAttended = attendanceData.filter(a => a.isPresent).length;
        const attendancePercentage = totalClasses > 0
            ? ((classesAttended / totalClasses) * 100).toFixed(2)
            : 0;

        const averageFocus = attentionData.length > 0
            ? (attentionData.reduce((sum, a) => sum + a.focusPercent, 0) / attentionData.length).toFixed(2)
            : 0;

        res.status(200).json({
            success: true,
            student: {
                id: student._id,
                spid: student.spid,
                name: student.name,
                classId: student.classId
            },
            attendance: attendanceData,
            attention: attentionData,
            stats: {
                totalClasses,
                classesAttended,
                attendancePercentage: `${attendancePercentage}%`,
                averageFocusPercent: `${averageFocus}%`
            }
        });
    } catch (error) {
        throw error;
    }
});

// GET /getAllData - Get all analytics data
router.get('/getAllData', authMiddleware, async (req: Request, res: Response) => {
    try {
        // Get all students
        const students = await Student.find().populate('classId');

        // Get all attendance records
        const attendance = await Attendance.find().populate('studentId classId');

        // Get all attention records
        const attention = await Attention.find().populate('studentId classId');

        // Calculate overall statistics
        const totalStudents = students.length;
        const totalAttendanceRecords = attendance.length;
        const presentCount = attendance.filter(a => a.isPresent).length;
        const overallAttendanceRate = totalAttendanceRecords > 0
            ? ((presentCount / totalAttendanceRecords) * 100).toFixed(2)
            : 0;

        const averageOverallFocus = attention.length > 0
            ? (attention.reduce((sum, a) => sum + a.focusPercent, 0) / attention.length).toFixed(2)
            : 0;

        res.status(200).json({
            success: true,
            students,
            attendance,
            attention,
            stats: {
                totalStudents,
                totalAttendanceRecords,
                totalAttentionRecords: attention.length,
                overallAttendanceRate: `${overallAttendanceRate}%`,
                averageOverallFocus: `${averageOverallFocus}%`
            }
        });
    } catch (error) {
        throw error;
    }
});

export default router;
