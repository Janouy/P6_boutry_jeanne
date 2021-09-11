const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const base64 = require('base-64');

const User = require('../models/user');

//stockage de l'email encodé//
let encodedEmail;

//permet à un utilisateur de s'enregistré dans la bdd, l'email est masqué et le mot de passe hashé//
exports.signup = (req, res, next) => {
  let encoded = base64.encode(req.body.email);
  encodedEmail = encoded;
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: encoded,
      password: hash
    });
    user.save()
    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
    .catch(error => res.status(400).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

//permet à un utilisateur enregistré de se connecter//
exports.login = (req, res, next) => {
  let loginEncodedEmail = base64.encode(req.body.email);
    User.findOne({email: loginEncodedEmail})
    .then(user => {
      if (!user) {
        return res.status(403).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id},
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error })); 
}; 