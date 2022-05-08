// Imports
const jwt = require("jsonwebtoken");
const db = require('../models/index');

// Création d'un nouveau commentaire
exports.createComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;


    db.Message.findOne({
        where: { id: req.params.messageId },
        attributes: { exclude: ['UserId'] },
    })
        .then(messageFound => {
            if(messageFound) {
                const comment = db.Comment.build({
                    content: req.body.content,
                    idPOSTS: messageFound.id,
                    idUSERS: userId,
                        },
                    );
                console.log(comment);
                comment.save()
                    .then(() => res.status(201).json({ message: 'Votre commentaire a bien été créé !' }))
                    .catch(error => res.status(400).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
            } else {
                return res.status(404).json({ error: 'Message non trouvé'})
            }
        })
        .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));

};

//Obtention de tous les commentaires sous une publication
exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        order: [['updatedAt', "ASC"], ['createdAt', "ASC"]],
        where: { idPOSTS: req.params.messageId },
        attributes: { exclude: ['UserId', 'MessageId'] },
        include: [{
            model: db.User,
            attributes: [ 'prename', 'surname' ]
        }]
    })
        .then(commentFound => {
            if(commentFound) {
                res.status(200).json(commentFound);
                console.log(commentFound);
            } else {
                res.status(404).json({ error: 'Aucun commentaire trouvé' });
            }
        })
        .catch(error => {
            res.status(500).send({ error: '⚠ Oops, une erreur s\'est produite !' });
        });
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({
        attributes: ['id'],
        where: { id: req.params.commentId }
    })
        .then(commentFound => {
            if(commentFound) {
                db.Comment.destroy({
                    where: { id: req.params.commentId }
                })
                    .then(() => res.status(200).json({ message: 'Votre commentaire a été supprimé' }))
                    .catch(() => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));

            } else {
                return res.status(404).json({ error: 'Commentaire non trouvé'})
            }
        })
        .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
}
