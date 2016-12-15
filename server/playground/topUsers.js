/**
 * Created by baunov on 01/11/16.
 */
const express = require("express");
const bodyParser = require("body-parser");
const {mongoose} = require('../db/mongoose');

const User = require("../models/user");

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Started from the bottom now we here (${port})`);

    generateUsers().then( (users) => {

        return Promise.all(users.map( (user, index) => User.modifyRank(user._id, index*10)));

    }).then( (modifiedUsers) => {
        console.log(modifiedUsers);
        return User.getTopRated(0,2);
    }).then( (topRated) => {
        console.log("TOP RATED----------------");
        console.log(topRated);
    }).catch( (error) => {
        console.log(error);
    });
});



function generateUsers()
{
    let usersAr = [];
    let promisesAr = [];
    for(let i = 0; i < 10; i++)
    {
        let userObj = {};

        userObj.username = "User_"+String(i);
        userObj.password = "abc123"+String(i);
        userObj.email = `mail123${i}@abc.com`;
        userObj.rank = 0;

        usersAr.push(userObj);
        let user = new User(userObj);

        promisesAr.push(user.save());
    }

    return Promise.all(promisesAr);
}
