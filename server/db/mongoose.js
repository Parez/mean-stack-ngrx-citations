"use strict";
/**
 * Created by baunov on 25/10/16.
 */
var mongoose = require('mongoose');
var mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/citations';
var MongooseConnection = (function () {
    function MongooseConnection() {
        mongoose.Promise = global.Promise;
    }
    MongooseConnection.prototype.connect = function (dbURL) {
        if (dbURL === void 0) { dbURL = 'citations'; }
        var db = mongoose.connection;
        return new Promise(function (resolve, reject) {
            mongoose.connect(mongoURL + dbURL);
            db.on('error', function () {
                console.error.bind(console, 'connection error:');
                reject('error connecting to db ' + dbURL);
            });
            //Logging once connected to database
            db.once('open', function () {
                console.log('Connected to MongoDB');
                resolve(db);
            });
        });
    };
    return MongooseConnection;
}());
exports.MongooseConnection = MongooseConnection;
