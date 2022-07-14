const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.signup = (req, res) => { 
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé'}))
        .catch(error => res.status(400).json({email: 'Email déja utilisé'}));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(400).json({ error });
          }
          res.status(200).json({
            userId: user._id,
            admin: user.admin,
            token: jwt.sign(
                { 
                  userId: user._id,
                  admin: user.admin,
                  nom: user.nom,
                  prenom: user.prenom
                },
                process.env.TOKEN_KEY, 
                { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.delete = (req, res) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json('Compte supprimé'))
    .catch(error => res.status(400).json({ error }));
};

exports.getAllUsers = (req, res) => {
  User.find()
      .then(users => res.status(200).json(users))
      .catch(error => res.status(404).json({ error: "Aucun User trouvé " }));
};

exports.getOneUser = (req, res) => {
  User.findOne({ _id: req.params.id })
      .then(user => res.status(200).json(user))
      .catch(error => res.status(404).json({ error }));
};
