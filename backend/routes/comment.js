// Permet d'importer express
const express = require('express');

// Crée un routeur
const router = express.Router();

// Permet d'importer le middleware auth
const auth = require('../middlewares/auth');


// Permet d'importer le controller comment
const commentCtrl = require('../controllers/comment');


// Routes de l'API pour les messages
router.post('/:messageId', auth, commentCtrl.createComment);
router.get('/:messageId', auth, commentCtrl.getAllComments);
router.delete('/:commentId', auth, commentCtrl.deleteComment);


// Permet d'exporter le router
module.exports = router;
