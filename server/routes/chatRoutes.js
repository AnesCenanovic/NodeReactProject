const mongoose = require('mongoose');
const requireLogin = require('../services/requireLogin');

const Message = mongoose.model('messages');
const Conversation = mongoose.model('conversations');

module.exports = app => {
    app.get('/api/conversations', requireLogin, async (req, res) => {
        const conversations = await Conversation.find({ participants: req.user.id })
            .populate('participants', 'name role') 
            .sort({ lastMessageAt: -1 });
        res.send(conversations);
    });

    app.get('/api/conversations/:id/messages', requireLogin, async (req, res) => {
        const messages = await Message.find({ _conversation: req.params.id })
            .sort({ sentAt: 'asc' });
        res.send(messages);
    });

    app.post('/api/conversations', requireLogin, async (req, res) => {
        const { otherUserId } = req.body;
        let conversation = await Conversation.findOne({
            participants: { $all: [req.user.id, otherUserId] }
        });

        if (!conversation) {
            conversation = new Conversation({
                participants: [req.user.id, otherUserId]
            });
            await conversation.save();
        }
        res.send(conversation);
    });
};