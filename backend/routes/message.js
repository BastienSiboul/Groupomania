// Permet d'importer express
const express = require('express');

// Crée un routeur
const router = express.Router();

// Permet d'importer le middleware auth
const auth = require('../middlewares/auth');

// Permet d'importer le middleware multer
const multer = require('../middlewares/multer-config');

// Permet d'importer le controller message
const postCtrl = require('../controllers/message');

// Routes de l'API pour les messages
router.post('', auth, multer, postCtrl.createPost);
router.get('', auth, postCtrl.getAllMessages);
router.delete('/:messageId', auth, postCtrl.deleteMessage);

// Permet d'exporter le router
module.exports = router;
