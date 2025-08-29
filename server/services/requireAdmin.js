module.exports = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send({ error: 'You do not have administrative privileges!' });
    }
    next();
};