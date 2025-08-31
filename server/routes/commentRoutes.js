const mongoose = require('mongoose');
const requireLogin = require('../services/requireLogin');

const Post = mongoose.model('posts');
const Comment = mongoose.model('comments');

module.exports = app => {
    app.get('/api/posts/:postId/comments', async (req, res) => {
        const comments = await Comment.find({ _post: req.params.postId })
            .sort({ createdAt: -1 });
        res.send(comments);
    });
    app.post('/api/posts/:postId/comments', requireLogin, async (req, res) => {
        const comment = new Comment({
            content: req.body.content,
            _author: req.user.id,
            authorName: req.user.name,
            _post: req.params.postId,
            createdAt: Date.now()
        });
        await comment.save();
        res.send(comment);
    });

    app.patch('/api/posts/:postId/like', requireLogin, async (req, res) => {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        const userIdString = req.user.id.toString();
        const likeIndex = post.likes.findIndex(id => id.toString() === userIdString);

        if (likeIndex > -1) {
            post.likes.splice(likeIndex, 1);
        } else {
            post.likes.push(req.user.id);
        }

        const updatedPost = await post.save();
        res.send(updatedPost);
    });
};