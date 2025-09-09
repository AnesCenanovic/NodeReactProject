
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const { v1: uuidv1 } = require('uuid'); 
const requireLogin = require('../services/requireLogin');
const requireAdmin = require('../services/requireAdmin');
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
        console.log('R2 Bucket Name:', keys.r2BucketName);
        console.log('R2 Endpoint:', keys.r2Endpoint);
        console.log('R2 Access Key:', keys.r2AccessKeyId);
        console.log('R2 Secret Key:', keys.r2SecretAccessKey);
        const { fileType } = req.query;
        const key = `${req.user.id}/${uuidv1()}`;

        s3.getSignedUrl('putObject', {
            Bucket: keys.r2BucketName,
            ContentType: fileType,
            Key: key,
            Expires: 60 * 5 // 5 minutes
        }, (err, url) => {
            if (err) {
                console.error("Error generating presigned URL:", err);
                return res.status(500).send({ error: "Failed to prepare upload." });
            }
            res.send({ key, url });
        });
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
        console.log('BACKEND: Received request body:', req.body);
        const { userToShareWith } = req.body;

        try {
            const file = await File.findById(req.params.fileId);

            if (!file) {
                return res.status(404).send({ error: 'File not found.' });
            }

            if (file._uploader.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
                return res.status(403).send({ error: 'Permission denied.' });
            }

            const sharedWithStringIds = file.sharedWith.map(id => id.toString());
            console.log('Current members (as strings):', sharedWithStringIds);

            const isAlreadyShared = sharedWithStringIds.includes(userToShareWith);
            console.log(`Is file already shared with ${userToShareWith}?`, isAlreadyShared);

            let updatedFile = file;

            if (userToShareWith && !isAlreadyShared) {
                file.sharedWith.push(userToShareWith);
                updatedFile = await file.save(); 
                console.log('SUCCESS: User added. New members:', updatedFile.sharedWith);
            } else {
                console.log('INFO: User was already a member or invalid. No changes made.');
            }
            
            res.send(updatedFile);

        } catch (err) {
            console.error("Error during share operation:", err);
            res.status(500).send({ error: 'An error occurred while sharing the file.' });
        }
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

    app.delete('/api/files/:fileId', requireLogin, async (req, res) => {
        try {
            const file = await File.findById(req.params.fileId);

            if (!file) {
                return res.status(404).send({ error: 'File not found.' });
            }

            if (file._uploader.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
                return res.status(403).send({ error: 'You do not have permission to delete this file.' });
            }

            await File.findByIdAndDelete(req.params.fileId);

            res.send({ message: 'File deleted successfully.' });

        } catch (err) {
            res.status(422).send(err);
        }
    });
    app.get('/api/files/all', requireLogin, requireAdmin, async (req, res) => {
        const allFiles = await File.find({})
            .populate('_uploader', 'name')
            .sort({ uploadedAt: -1 });
        res.send(allFiles);
    });
};