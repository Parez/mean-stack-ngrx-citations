"use strict";
/**
 * Created by baunov on 25/10/16.
 */
var _ = require('lodash');
var express_1 = require('express');
var ObjectId = require('mongodb').ObjectId;
var user_logic_1 = require('../db/logic/user.logic');
var auth_1 = require('../middleware/auth');
var router = express_1.Router();
//Get user by ID
router.get('/:id', function (req, res) {
    var id = req.params.id;
    if (!ObjectId.isValid(id)) {
        console.log("ID " + id + " is not valid");
        res.status(404).send("Error: ID " + id + " is not valid");
    }
    user_logic_1.User.findById(id).then(function (user) {
        if (!user) {
            res.status(404).send("Error: User " + id + " not found");
        }
        res.send((new user_logic_1.User(user)).getInfo());
    }).catch(function (error) {
        res.status(400).send(error);
    });
});
router.get('/profile', auth_1.auth, function (req, res) {
});
//login existing user
router.post('/signin', function (req, res) {
    var cred = req.body.cred;
    var pass = req.body.password;
    var tempUser = {};
    user_logic_1.User.loginByCredential(cred, pass).then(function (user) {
        tempUser = user;
        return user_logic_1.User.generateAuthToken(user);
    }).then(function (token) {
        res.header('x-auth', token).send((new user_logic_1.User(tempUser)).getInfo());
    }).catch(function (err) {
        res.status(400).send(err);
    });
});
//Create new User in DB; sign up new user
router.post('/signup', function (req, res) {
    var userObj = user_logic_1.User.createUserObj(_.pick(req.body, ['email', 'password', 'username', 'name']));
    var tempUser = {};
    user_logic_1.User.registerUser(userObj).then(function (user) {
        tempUser = user;
        return user_logic_1.User.generateAuthToken(user);
    }).then(function (token) {
        res.header('x-auth', token).send((new user_logic_1.User(tempUser)).getInfo());
    }).catch(function (err) {
        res.status(400).send(err);
    });
});
module.exports = router;
/*
 router.get("/", (req, res) => {
 Citation.find({}).then((docs) => {
 res.status(200).send(docs);
 }).catch( (error) => {
 res.status(400).send(error);
 })
 });



 router.post('/', (req, res) => {
 console.log(req.body);
 var citation = new Citation(_.pick(req.body, ["text", "author"]));

 citation.save().then(
 (doc) => {
 res.send(doc);
 },
 (error) => {
 res.status(400).send(error);
 }
 );
 });

 router.delete("/:id", (req, res) => {
 var id = req.params.id;

 if(!ObjectId.isValid(id))
 {
 console.log(`ID ${id} is not valid`);
 res.status(404).send(`Error: ID ${id} is not valid`);
 }

 Citation.findByIdAndRemove(id).then((doc) => {
 if(!doc)
 {
 res.status(404).send();
 }

 res.send(doc);
 }).catch( (error) => {
 res.status(400).send();
 })
 });

 router.patch("/like/:id", (req, res) => {
 var id = req.params.id;

 if(!ObjectId.isValid(id))
 {
 console.log(`ID ${id} is not valid`);
 res.status(404).send(`Error: ID ${id} is not valid`);
 }



 Citation.findByIdAndUpdate(id, {$inc: {likes: 1}}, {new: true}).then((citation) => {
 if(!citation) res.status(404).send();

 res.send({citation});
 }).catch( (error) => {
 res.status(400).send(error);
 });

 console.log(req.body);
 });
 */
