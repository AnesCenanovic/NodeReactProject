const mongoose = require('mongoose');
const requireLogin = require('../services/requireLogin');

const Post = mongoose.model('posts');

module.exports = app => {
    // Route to get all posts
    app.get('/api/posts', async (req, res) => {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5; 

        const startIndex = (page - 1) * limit;

        try {
            const [posts, total] = await Promise.all([
                Post.find({})
                    .sort({ createdAt: -1 })
                    .skip(startIndex)
                    .limit(limit),
                Post.countDocuments()
            ]);
            
            res.send({
                posts,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                totalPosts: total
            });
        } catch (err) {
            res.status(500).send({ error: 'Error fetching posts' });
        }
    });

    app.post('/api/posts', requireLogin, async (req, res) => {
        const { title, content, links } = req.body;

        const post = new Post({
            title,
            content,
            links: links.split(',').map(link => link.trim()), 
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
    app.get('/api/posts', async (req, res) => {
            const page = parseInt(req.query.page, 10) || 1;
            const limit = parseInt(req.query.limit, 10) || 5; 

            const startIndex = (page - 1) * limit;

            try {
                const [posts, total] = await Promise.all([
                    Post.find({})
                        .sort({ createdAt: -1 })
                        .skip(startIndex)
                        .limit(limit),
                    Post.countDocuments()
                ]);
                
                res.send({
                    posts,
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    totalPosts: total
                });
            } catch (err) {
                res.status(500).send({ error: 'Error fetching posts' });
            }
        });
};