const mongoose = require('mongoose');
const User = mongoose.model('users');
const requireLogin = require('../services/requireLogin');
const requireAdmin = require('../services/requireAdmin');

module.exports = app => {
    app.post('/api/user/role', async (req, res) => {
        if (!req.user) {
            return res.status(401).send({ error: 'You must log in!' });
        }
        const { role } = req.body;
        if (!['parent', 'teacher', 'medical professional'].includes(role)) {
            return res.status(400).send({ error: 'Invalid role' });
        }
        req.user.role = role;
        await req.user.save();
        res.send(req.user);
    });
    app.get('/api/users', async (req, res) => {
        if (!req.user) {
            return res.status(403).send({ error: 'Access denied' });
        }
        const users = await User.find({}, 'name email role'); // Fetch only name, email, and role
        res.send(users);
    });

    app.post('/api/users/:userId/role', requireLogin, requireAdmin, async (req, res) => {
        const { role } = req.body;
        const { userId } = req.params;

    if (!['parent', 'teacher', 'medical professional', 'admin'].includes(role)) {
        return res.status(400).send({ error: 'Invalid role' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        
        user.role = role;
        await user.save();
        res.send(user); 
    } catch (err) {
        res.status(422).send(err);
    }
});
};