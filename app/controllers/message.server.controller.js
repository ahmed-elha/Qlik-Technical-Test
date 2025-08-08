'use strict';

const Message = require('../models/message.model');
const _ = require('lodash');
const {isPalindrome} = require('../utils/palindrome')

const model = new Message()

exports.getMessages = function (req, res) {
    model.find()
        .then(messages => {
            res.json(messages);
        })
        .catch(err => {
            res.status(500).send({
                message: 'Database error finding messages.'
            });
        });
};

exports.getSingleMessage = function (req, res) {
    model.findById(req.params.id)
        .then(message => {
            if (!message) {
                return res.status(404).send({
                    message: 'Message not found'
                });
            }
            res.json(message);
        })
        .catch(err => {
            res.status(404).send({
                message: 'Message not found'
            });
        });
};

exports.postMessage = function (req, res) {
    console.log(req.body)

    req.body.is_palindrome = isPalindrome(req.body.message);

    model.insert(req.body, function (err, savedMessage) {
        if (err) {
            res.status(500).send({
                message: 'Database error saving new message.'
            });
            return;
        }

        res.status(201).json(savedMessage);
    });
};

exports.deleteMessage = function (req, res) {
    model.findById(req.params.id)
        .then(message => {
            if (!message) {
                return res.status(404).send({
                    message: 'Message not found'
                });
            }

            // Supprimer si trouvé
            return model.remove(req.params.id)
                .then(() => {
                    res.json({
                        message: 'The message has been removed.'
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: 'Database error deleting message.'
            });
        });
};
