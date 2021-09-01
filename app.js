const express = require ('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://Janouy:projet1@cluster0.mlmju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/api/sauces', (req, res, next) => {
  const sauce = [
    {
    _id: 'bvhfjde',
    name: 'Sauce piquante 1',
    manufacturer: 'Steeve',
    description: 'hot hot hot',
    mainPepper: 'piment de la mort',
    imageUrl: 'https://images.pexels.com/photos/4874483/pexels-photo-4874483.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    heat: 10,
    likes: 321,
    dislikes: 42,
    usersLiked: [],
    usersDisliked: [],
    },
    {
    _id: 'bvhfbhg',
    name: 'Sauce piquante 2',
    manufacturer: 'Miranda',
    description: 'so hot',
    mainPepper: 'piment muy forte',
    imageUrl: 'https://images.pexels.com/photos/5738091/pexels-photo-5738091.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    heat: 7,
    likes: 452,
    dislikes: 36,
    usersLiked: [],
    usersDisliked: [],
    },
  ];
  res.status(200).json(sauce);
}),


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', userRoutes);

module.exports = app;