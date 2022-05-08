const jwt = require("jsonwebtoken");
const db = require('../models/index');
const fs = require('fs');

// Création d'un nouveau message
exports.createPost = (req, res, next) => {
    const content = req.body.content;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;


    // Vérification que tous les champs sont complétés
    if (content == null || content == '') {
        return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
    }

    db.User.findOne({
        where: { id: userId }
    })

        .then(userFound => {
            if(userFound) {
                const message = db.Message.build({
                    content: req.body.content,
                    attachment: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.attachment,
                    idUSERS: userFound.id
                });
                console.log(message);
                message.save()
                    .then(() => res.status(201).json({ message: 'Votre message a bien été créé !' }))
                    .catch(error => res.status(400).json({ error: '⚠ Oops, une erreur s\'est produite 9 !' }));
            } else {
                return res.status(404).json({ error: 'Utilisateur non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite 8 !' }));
};

// Affichage de tous les messages
exports.getAllMessages = (req, res, next) => {
    db.Message.findAll({
        order: [['createdAt', "DESC"]] ,
        attributes: { exclude: ['UserId']},
        include: [{
            model: db.User,
            attributes: ['surname', 'prename']
        }]
    })
        .then(messageFound => {
            if(messageFound.length > null) {
                res.status(200).json(messageFound);
            } else {
                res.status(404).json({ error: 'Aucun message trouvé' });
            }
        })
        .catch(error => {
            res.status(500).send({ error: '⚠ Oops, une erreur s\'est produite 3 !' });
        });
};

// Suppression d'un message
exports.deleteMessage = (req, res, next) => {
    db.Message.destroy({ where: { id: req.params.messageId }})
        .then(() => res.status(200).json({ message: "Message supprimé !" }))
        .catch(error => res.status(400).json({ error }))
}
