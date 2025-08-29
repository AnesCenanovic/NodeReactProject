const mongoose = require('mongoose');
const requireLogin = require('../services/requireLogin');

const Forum = mongoose.model('forums');
const User = mongoose.model('users'); 

module.exports = app => {
    app.get('/api/forums', requireLogin, async (req, res) => {
        const forums = await Forum.find({ members: req.user.id })
            .sort({ createdAt: -1 });
        res.send(forums);
    });

    app.post('/api/forums', requireLogin, async (req, res) => {
        const { title, description, type, links, invitedEmails } = req.body;

        const invitedUsers = await User.find({ email: { $in: invitedEmails } });
        const memberIds = invitedUsers.map(user => user.id);

        if (!memberIds.includes(req.user.id)) {
            memberIds.push(req.user.id);
        }

        const forum = new Forum({
            title,
            description,
            type,
            links: links ? links.split(',').map(link => link.trim()) : [],
            _creator: req.user.id,
            members: memberIds,
            createdAt: Date.now()
        });

        try {
            await forum.save();
            res.send(forum);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};