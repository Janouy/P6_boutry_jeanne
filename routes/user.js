//création d'un routeru express pour ajouter des routes//
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const createImages = require('../middleware/createImages');
const passwordLength = require('../middleware/password');

router.post('/signup', passwordLength, createImages, userCtrl.signup);
router.post('/login', createImages, userCtrl.login);

module.exports = router;