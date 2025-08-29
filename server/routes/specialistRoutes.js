const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin'); 

const Specialist = mongoose.model('specialists');

module.exports = app => {
    app.get('/api/specialists', async (req, res) => {
        const specialists = await Specialist.find({});
        res.send(specialists);
    });

    app.get('/api/specialists/:id', async (req, res) => {
        const specialist = await Specialist.findById(req.params.id);
        res.send(specialist);
    });

    app.post('/api/specialists', requireLogin, requireAdmin, async (req, res) => {
        const { name, specialty, shortBio, fullBio, contactEmail, contactPhone } = req.body;
        const specialist = new Specialist({
            name, specialty, shortBio, fullBio, contactEmail, contactPhone
        });
        await specialist.save();
        res.send(specialist);
    });
};