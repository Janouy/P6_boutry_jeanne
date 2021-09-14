//création d'un routeru express pour ajouter des routes//
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const createImages = require('../middleware/createImages');

router.post('/signup', createImages, userCtrl.signup);
router.post('/login', createImages, userCtrl.login);

module.exports = router;