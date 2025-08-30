const mongoose = require('mongoose');
const requireLogin = require('../services/requireLogin');
const requireAdmin = require('../services/requireAdmin'); 

const Specialist = mongoose.model('specialists');
const Review = mongoose.model('reviews');

module.exports = app => {
    app.get('/api/specialists', async (req, res) => {
        const specialists = await Specialist.find({});
        res.send(specialists);
    });

    app.get('/api/specialists/:id', async (req, res) => {
        const specialist = await Specialist.findById(req.params.id);
        const reviews = await Review.find({ _specialist: req.params.id });
        res.send(specialist, reviews);
    });

    app.post('/api/specialists', requireLogin, requireAdmin, async (req, res) => {
        const { name, specialty, shortBio, fullBio, contactEmail, contactPhone, website, address } = req.body;
        const specialist = new Specialist({
            name, specialty, shortBio, fullBio, contactEmail, contactPhone, website, address
        });
        await specialist.save();
        res.send(specialist);
    });

     app.post('/api/specialists/:id/reviews', requireLogin, async (req, res) => {
        const { rating, comment } = req.body;
        const review = new Review({
            rating,
            comment,
            _author: req.user.id,
            authorName: req.user.name,
            _specialist: req.params.id, 
            createdAt: Date.now()
        });

        await review.save();
        res.send(review); 
    });

    app.get('/api/specialists/:id/reviews', async (req, res) => {
        const reviews = await Review.find({ _specialist: req.params.id });
        res.send(reviews);
    });
};