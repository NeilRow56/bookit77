import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter your name'],
		maxLength: [50, 'Your name cannot exceed 50 characters'],
	},
	email: {
		type: String,
		required: [true, 'Please enter your email address'],
		unique: true,
		validate: [validator.isEmail, 'please enter a valid email address'],
	},
	password: {
		type: String,
		required: [true, 'Please enter your password'],
		minLength: [6, 'Your password must be at least 6 characters'],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: 'user',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

//encrypting user before saving

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', userSchema);
