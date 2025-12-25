import mongoose, { Schema, Document } from 'mongoose';

export interface IClass extends Document {
    name: string;
    students: string[];
}

const ClassSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    numberOfLectures:{
        type: Number,
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
}, {
    timestamps: true
});

export default mongoose.model<IClass>('Class', ClassSchema);
