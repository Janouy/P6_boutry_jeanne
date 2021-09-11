const mongoose = require('mongoose');

//ajout package de validation pour pré-valider les informations avant de les enregistrer//
const uniqueValidator = require('mongoose-unique-validator');

//création du modèle d'utilisateur//
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true}
});

//ce plugin assure qu'un adresse email ne pourra etre utilisée plusieurs fois//
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); 