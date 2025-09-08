
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const { v1: uuidv1 } = require('uuid'); 
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const File = mongoose.model('files');

const s3 = new AWS.S3({
    endpoint: keys.r2Endpoint,
    accessKeyId: keys.r2AccessKeyId,
    secretAccessKey: keys.r2SecretAccessKey,
    signatureVersion: 'v4',
    region: 'auto',
});

module.exports = app => {
    app.get('/api/upload/file', requireLogin, (req, res) => {
        const { fileType } = req.query;
        const key = `${req.user.id}/${uuidv1()}`; 

        s3.getSignedUrl('putObject', {
            Bucket: keys.r2BucketName,
            ContentType: fileType,
            Key: key
        }, (err, url) => res.send({ key, url }));
    });

    app.post('/api/files', requireLogin, async (req, res) => {
        const { originalName, s3Key, fileType } = req.body;
        const file = new File({
            originalName, s3Key, fileType,
            _uploader: req.user.id,
            sharedWith: [req.user.id] 
        });
        await file.save();
        res.send(file);
    });

    app.get('/api/files/:fileId/download', requireLogin, async (req, res) => {
        const file = await File.findById(req.params.fileId);
        if (!file || !file.sharedWith.includes(req.user.id)) {
            return res.status(403).send({ error: 'Access Denied' });
        }
        s3.getSignedUrl('getObject', {
            Bucket: keys.r2BucketName,
            Key: file.s3Key,
            Expires: 60 
        }, (err, url) => res.send({ url }));
    });

    app.post('/api/files/:fileId/share', requireLogin, async (req, res) => {
        const { userIdToShareWith } = req.body;
        const file = await File.findById(req.params.fileId);

        if (file._uploader.toString() !== req.user.id.toString()) {
            return res.status(403).send({ error: 'Only the owner can share this file.' });
        }
        if (!file.sharedWith.includes(userIdToShareWith)) {
            file.sharedWith.push(userIdToShareWith);
            await file.save();
        }
        res.send(file);
    });

    app.get('/api/files/my_files', requireLogin, async (req, res) => {
        const files = await File.find({ _uploader: req.user.id }).sort({ uploadedAt: -1 });
        res.send(files);
    });
    app.get('/api/files/shared_with_me', requireLogin, async (req, res) => {
        const files = await File.find({
            sharedWith: req.user.id,
            _uploader: { $ne: req.user.id }
        }).sort({ uploadedAt: -1 });
        res.send(files);
    });
};