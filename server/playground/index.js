"use strict";
/**
 * Created by baunov on 25/11/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose_1 = require('../db/mongoose');
var path = require('path');
console.log('Started playground');
var connection = new mongoose_1.MongooseConnection();
connection.connect('sales').then(function (db) {
    console.log(db);
});
var port = process.env.PORT || 3000;
var app = express();
app.use(express.static(path.join(__dirname, '/../dist')));
app.use(bodyParser.json());
app.listen(port, function () {
    console.log("Started from the bottom now we here (" + port + ")");
});
