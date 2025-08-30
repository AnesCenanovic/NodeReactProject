const mongoose = require('mongoose');
const requireLogin = require('../services/requireLogin');

const Forum = mongoose.model('forums');
const User = mongoose.model('users'); 

module.exports = app => {
    app.get('/api/forums', requireLogin, async (req, res) => {
        let forums;
        if (req.user.role === 'admin') {
            forums = await Forum.find({}).sort({ createdAt: -1 });
        } else {
            forums = await Forum.find({ members: req.user.id }).sort({ createdAt: -1 });
        }
        res.send(forums);
    });

    app.post('/api/forums', requireLogin, async (req, res) => {
        const { title, description, type, links, memberIds, eventDate } = req.body;

        const finalMemberIds = new Set(memberIds); 
        finalMemberIds.add(req.user.id);

        if (!memberIds.includes(req.user.id)) {
            memberIds.push(req.user.id);
        }

        const forum = new Forum({
            title,
            description,
            type,
            links: links ? links.split(',').map(link => link.trim()) : [],
            _creator: req.user.id,
            eventDate,
            members: Array.from(finalMemberIds),
            createdAt: Date.now()
        });

        try {
            await forum.save();
            res.send(forum);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.get('/api/forums/:id', requireLogin, async (req, res) => {
        try {
                const forum = await Forum.findById(req.params.id)
                    .populate('members', 'name email role'); 

                if (forum) {
                    res.send(forum);
                } else {
                    res.status(404).send({ error: 'Forum not found' });
                }
            } catch (err) {
                res.status(422).send(err);
            }
    });
};