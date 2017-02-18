import mongoose, { Schema } from 'mongoose';

const EmployeeSchema = new Schema({
    firstName: String,
    lastName: String,
    department: { type: Schema.ObjectId, ref: 'department' }
}, {
	timestamps: true
})

export default mongoose.model('employee', EmployeeSchema);
