const mongoose = require('mongoose');
const { Schema } = mongoose;

const forumSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    // Use an enum to restrict the type to specific values
    type: { type: String, enum: ['workshop', 'event', 'seminar'], default: 'workshop' },
    links: [String],
    // The user who created the forum
    _creator: { type: Schema.Types.ObjectId, ref: 'users' },
    // The list of all members, including the creator
    members: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    createdAt: { type: Date, default: Date.now }
});

mongoose.model('forums', forumSchema);