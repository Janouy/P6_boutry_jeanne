const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true, trim: true },
    manufacturer: {type: String, required: true, trim: true},
    description:{type: String, required: true, trim: true},
    mainPepper:{type: String, required: true, trim: true},
    imageUrl:{type: String, required: true},
    heat:{type: Number, required: true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: {type: [String], required: true},
    usersDisliked: {type: [String], required: true} 
});

module.exports = mongoose.model('Sauce', sauceSchema);