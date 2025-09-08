const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
    originalName: String, 
    s3Key: String, 
    fileType: String, 
    
    _uploader: { type: Schema.Types.ObjectId, ref: 'users' },

    sharedWith: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    
    uploadedAt: { type: Date, default: Date.now }
});

mongoose.model('files', fileSchema);