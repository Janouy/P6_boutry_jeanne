const express = require ('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://Janouy:projet1@cluster0.mlmju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res) => {
    res.json({message: 'requete reçue'});
});

module.exports = app;