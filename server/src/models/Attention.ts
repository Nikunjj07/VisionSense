import mongoose, { Schema, Document } from 'mongoose';

export interface IAttention extends Document {
    studentId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
    date: Date;
    time: string;
    focusPercent: number;
}

const AttentionSchema: Schema = new Schema({
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
    time: {
        type: String,
        required: true
    },
    focusPercent: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
});

// Create compound index for efficient queries
AttentionSchema.index({ studentId: 1, classId: 1, date: 1 });

export default mongoose.model<IAttention>('Attention', AttentionSchema);
