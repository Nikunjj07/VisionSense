import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
    spid: string;
    name: string;
    classId: mongoose.Types.ObjectId;
    faceEncoding: string;
}

const StudentSchema: Schema = new Schema({
    spid: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    faceEncoding: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

export default mongoose.model<IStudent>('Student', StudentSchema);
