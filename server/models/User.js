const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    role: { type: String, enum: ['parent', 'teacher', 'medical professional'], default: 'parent' },
    name: String,
    email: String
});

mongoose.model('users', userSchema);