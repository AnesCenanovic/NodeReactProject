const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    _conversation: { type: Schema.Types.ObjectId, ref: 'conversations' },
    _sender: { type: Schema.Types.ObjectId, ref: 'users' },
    senderName: String,
    content: String,
    sentAt: { type: Date, default: Date.now }
});

mongoose.model('messages', messageSchema);