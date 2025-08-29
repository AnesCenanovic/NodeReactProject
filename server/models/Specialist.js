const mongoose = require('mongoose');
const { Schema } = mongoose;

const specialistSchema = new Schema({
    name: { type: String, required: true },
    specialty: { type: String, required: true }, 
    profilePictureUrl: { type: String, default: '/images/default-specialist.png' },
    shortBio: { type: String, required: true }, 
    fullBio: String, 
    contactEmail: String,
    contactPhone: String,
    createdAt: { type: Date, default: Date.now }
});

mongoose.model('specialists', specialistSchema);