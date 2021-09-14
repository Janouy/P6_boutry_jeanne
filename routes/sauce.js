//création d'un routeru express pour ajouter des routes//
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');
const validForm = require('../middleware/validForm');

router.post('/', auth, multer, sauceCtrl.createSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);
router.put('/:id', auth, multer, validForm, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, multer, sauceCtrl.getOneSauce);
router.get('/', auth, multer, sauceCtrl.getAllSauce);

module.exports = router;