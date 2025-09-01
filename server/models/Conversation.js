const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    lastMessageAt: { type: Date, default: Date.now }
});

mongoose.model('conversations', conversationSchema);