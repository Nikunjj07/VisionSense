import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
    userId: mongoose.Types.ObjectId;
    classId: mongoose.Types.ObjectId;
    startAt: Date;
    endAt: Date;
    duration: number;
    status: 'active' | 'completed' | 'cancelled';
}

const SessionSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    startAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    endAt: {
        type: Date,
        required: false
    },
    duration: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active',
        required: true
    }
}, {
    timestamps: true
});

// Create index for efficient queries
SessionSchema.index({ userId: 1, status: 1 });

export default mongoose.model<ISession>('Session', SessionSchema);
