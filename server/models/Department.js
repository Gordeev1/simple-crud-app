import mongoose, { Schema } from 'mongoose';

const DepartmentSchema = new Schema({ 
    name: String
}, {
	timestamps: true
})

export default mongoose.model('department', DepartmentSchema);