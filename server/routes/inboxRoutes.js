const mongoose = require('mongoose');
const requireLogin = require('../services/requireLogin');

const Forum = mongoose.model('forums');
const Post = mongoose.model('posts');
const Review = mongoose.model('reviews');

module.exports = app => {
    app.get('/api/inbox', requireLogin, async (req, res) => {
        try {
            const [forums, posts, reviews] = await Promise.all([
                // 1. Find all forums the user is a member of
                Forum.find({ members: req.user.id }, 'title createdAt'),

                // 2. Find all posts the user has created
                Post.find({ _user: req.user.id }, 'title createdAt'),

                // 3. Find all reviews the user has written
                Review.find({ _author: req.user.id }, 'comment rating createdAt')
            ]);

            // Send back a single object containing all the data
            res.send({ forums, posts, reviews });

        } catch (err) {
            res.status(500).send({ error: 'Failed to fetch inbox data' });
        }
    });
};