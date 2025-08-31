const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    content: String,
    // Link to the user who wrote the comment
    _author: { type: Schema.Types.ObjectId, ref: 'users' },
    authorName: String, // Storing the name for easy display
    // Link to the post the comment is on
    _post: { type: Schema.Types.ObjectId, ref: 'posts' },
    createdAt: { type: Date, default: Date.now }
});

mongoose.model('comments', commentSchema);