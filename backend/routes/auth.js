// Permet d'importer express
const express = require('express');

// Crée un routeur
const router = express.Router();

// Permet d'importer le controller auth
const authCtrl = require('../controllers/auth');

// Permet d'importer le middleware auth
const auth = require('../middlewares/auth');

// Routes de l'API pour les messages
router.post('/signup', authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/:id', auth, authCtrl.getUserProfile);
router.delete('/:id', auth, authCtrl.deleteAccount);

// Permet d'exporter le router
module.exports = router;
