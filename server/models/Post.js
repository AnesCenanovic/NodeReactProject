const mongoose = require('mongoose');
const { Schema } = mongoose;


const postSchema = new Schema({
    title: String,
    content: String,
    links: [String],
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    authorName: String,
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

mongoose.model('posts', postSchema);