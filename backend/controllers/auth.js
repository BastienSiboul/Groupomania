const db = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Inscription d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    var email    = req.body.email;
    var surname = req.body.surname;
    var prename = req.body.prename;
    var password = req.body.password;

    if(email == null || email == '' || surname == null || surname == ''|| prename == null || prename == ''|| password == null || password == '') {
        return res.status(400).json({ error: 'Tous les champs doivent être renseignés' });
    }

    if(!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Adresse mail invalide' });
    }

    db.User.findOne({
        attributes: ['email'],
        where: {
            email: email
        }
    })
        .then(userExist => {
            if (!userExist) {
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const user = /*new User*/ db.User.build({
                            prename: req.body.prename,
                            surname: req.body.surname,
                            email: req.body.email,
                            password: hash,
                            isAdmin: 0
                        });
                        console.log(user);
                        user.save()
                            .then(() => res.status(201).json({message: 'Votre compte a bien été créé !'}))
                            .catch(error => res.status(400).json({error: '⚠ Oops, une erreur s\'est produite !'}));
                    })
                    .catch(error => res.status(500).json({error: 'Une erreur s\'est produite lors de la création de votre compte'}));
            } else {
                return res.status(404).json({error: 'Cet utilisateur existe déjà'})
            }
        })
};

// Connection de l'utilisateur
exports.login = (req, res, next) => {
    db.User.findOne({
        where: { email: req.body.email }
    })
        .then(user => {
            if(user) {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid) {
                            return res.status(401).json({ error: 'Mot de passe incorrect' });
                        }
                        res.status(200).json({
                            userId: user.id,
                            isAdmin: user.isAdmin,
                            prename: user.prename,
                            surname: user.surname,
                            imageProfile: user.imageProfile,
                            token: jwt.sign(
                                {userId: user.id},
                                process.env.SECRET_TOKEN,
                                {expiresIn: '24h'}
                            )
                        });
                    })
                    .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
            } else {
                return res.status(404).json({ error: 'Cet utilisateur n\'existe pas, veuillez créer un compte' })
            }
        })
        .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
};

// Obtention du profil de l'utilisateur
exports.getUserProfile = (req, res, next) => {
    const id = req.params.id;
    db.User.findOne({
        attributes: [ 'id', 'prename', 'surname', 'email', 'isAdmin' ],
        where: { id: id }
    })
        .then(user => {
            if(user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Utilisateur non trouvé' })
            }
        })
        .catch(error => res.status(404).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
};

// Suppression du compte de l'utlisateur
exports.deleteAccount = (req, res, next) => {
    const id = req.params.id;
    db.User.findOne({
        attributes: ['id'],
        where: { id: id }
    })
        .then(user => {
            if(user) {
                db.User.destroy({
                    where: { id: id }
                })
                    .then(() => res.status(200).json({ message: 'Votre compte a été supprimé' }))
                    .catch(() => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));

            } else {
                return res.status(404).json({ error: 'Utilisateur non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ error: '⚠ Oops, une erreur s\'est produite !' }));
};
