const mongoose = require('mongoose');
const requireLogin = require('../services/requireLogin');

const Post = mongoose.model('posts');

module.exports = app => {
    // Route to get all posts
    app.get('/api/posts', async (req, res) => {
        const posts = await Post.find({}).sort({ createdAt: -1 });
        res.send(posts);
    });

    // We use the requireLogin middleware to ensure the user is authenticated
    app.post('/api/posts', requireLogin, async (req, res) => {
        const { title, content, links } = req.body;

        const post = new Post({
            title,
            content,
            links: links.split(',').map(link => link.trim()), // Split comma-separated links into an array
            _user: req.user.id,
            authorName: req.user.name,
            createdAt: Date.now()
        });

        try {
            await post.save();
            res.send(post);
        } catch (err) {
            res.status(422).send(err);
        }
    });
    // Route to get a specific post by ID
    app.get('/api/posts/:postId', async (req, res) => {
        try {
            const post = await Post.findOne({ _id: req.params.postId });
            if (post) {
                res.send(post);
            } else {
                res.status(404).send({ error: 'Post not found' });
            }
        } catch (err) {
            res.status(422).send(err);
        }
    });
};