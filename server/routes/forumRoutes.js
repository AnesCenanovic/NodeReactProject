const mongoose = require('mongoose');
const requireLogin = require('../services/requireLogin');
const requireAdmin = require('../services/requireAdmin');

const Forum = mongoose.model('forums');
const User = mongoose.model('users'); 

module.exports = app => {
    app.get('/api/forums', requireLogin, async (req, res) => {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 5; 

        const startIndex = (page - 1) * limit;

        try {
            const [forums, total] = await Promise.all([
                Forum.find({})
                    .sort({ createdAt: -1 })
                    .skip(startIndex)
                    .limit(limit),
                Forum.countDocuments()
            ]);
            
            res.send({
                forums,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                totalForums: total
            });
        } catch (err) {
            res.status(500).send({ error: 'Error fetching forums' });
        }
    });

    app.patch('/api/forums/:forumId', requireLogin, requireAdmin, async (req, res) => {
        try {
            const updatedForum = await Forum.findByIdAndUpdate(
                req.params.forumId,
                req.body, 
                { new: true } 
            );
            res.send(updatedForum);
        } catch (err) {
            res.status(422).send(err);
        }
    });

    app.delete('/api/forums/:forumId', requireLogin, requireAdmin, async (req, res) => {
        try {
            await Forum.findByIdAndDelete(req.params.forumId);
            res.send({ message: 'Forum deleted successfully' });
        } catch (err) {
            res.status(422).send(err);
        }
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