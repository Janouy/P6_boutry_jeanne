// import des application téléchargées//
const express = require ('express');
const mongoose = require('mongoose');
const path = require('path');

//import du fichier des variables d'environnement//
const dotenv = require("dotenv");

dotenv.config();

//ajout des routeurs sauce et user//
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

//permet à deux servers différents de communiquer entre eux, empêche les erreurs de CORS//
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

//connection avec monggose de la bdd MongoDb//
mongoose.connect('mongodb+srv://' + process.env.DB_ID + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// permet d'extraire un objet JSON d'une requete POST//
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/images/', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;