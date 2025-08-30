const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true },
    _author: { type: Schema.Types.ObjectId, ref: 'users' },
    authorName: String,
    _specialist: { type: Schema.Types.ObjectId, ref: 'specialists' },
    createdAt: { type: Date, default: Date.now }
});

mongoose.model('reviews', reviewSchema);