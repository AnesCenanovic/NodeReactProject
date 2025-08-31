const mongoose = require('mongoose');
const requireLogin = require('../services/requireLogin');
const requireAdmin = require('../services/requireAdmin');

const Post = mongoose.model('posts');

module.exports = app => {

    app.get('/api/posts/:postId', async (req, res) => {
        try {
            const post = await Post.findById(req.params.postId);
            if (post) {
                res.send(post);
            } else {
                res.status(404).send({ error: 'Post not found' });
            }
        } catch (err) {
            res.status(422).send(err);
        }
    });

        // Route to update a post (admin only)
    app.patch('/api/posts/:postId', requireLogin, requireAdmin, async (req, res) => {
        try {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.postId,
                req.body, 
                { new: true } 
            );
            res.send(updatedPost);
        } catch (err) {
            res.status(422).send(err);
        }
    });
    // Route to delete a post (admin only)
        app.delete('/api/posts/:postId', requireLogin, requireAdmin, async (req, res) => {
            const postIdToDelete = req.params.postId;
            console.log(`--- Attempting to delete post with ID: ${postIdToDelete} by User: ${req.user.name} ---`);
            
            try {
                const deletedPost = await Post.findByIdAndDelete(postIdToDelete);

                if (!deletedPost) {
                    console.log('--- Post not found in database, could not delete. ---');
                    return res.status(404).send({ error: 'Post not found.' });
                }

                console.log('--- Post successfully deleted from database ---');
                res.send({ message: 'Post deleted successfully' });

            } catch (err) {
                console.error('--- ERROR during post deletion ---', err); 
                res.status(422).send({ error: 'Failed to process delete request.' });
            }
        });

    app.post('/api/posts', requireLogin, async (req, res) => {
        const { title, content, links, type } = req.body;
        console.log('Backend received req.body:', req.body);
        const post = new Post({
            title,
            content,
            type: type,
            links: links.split(',').map(link => link.trim()), 
            _user: req.user.id,
            authorName: req.user.name,
            createdAt: Date.now()
        });
        console.log('Mongoose is about to save this post object:', post);
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