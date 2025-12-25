import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
    studentId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
    date: Date;
    isPresent: boolean;
}

const AttendanceSchema: Schema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    isPresent: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

// Create compound index for efficient queries
AttendanceSchema.index({ studentId: 1, classId: 1, date: 1 });

export default mongoose.model<IAttendance>('Attendance', AttendanceSchema);
