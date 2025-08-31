const mongoose = require('mongoose');
const { Schema } = mongoose;


const postSchema = new Schema({
    title: String,
    content: String,
    type: { 
        type: String, 
        enum: ['article', 'guide', 'research paper'], 
        default: 'article' 
    },
    links: [String],
    _user: { type: Schema.Types.ObjectId, ref: 'users' },
    authorName: String,
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    commentCount: { type: Number, default: 0 }
});

mongoose.model('posts', postSchema);