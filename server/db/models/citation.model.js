"use strict";
/**
 * Created by baunov on 28/11/16.
 */
var mongoose = require('mongoose');
var user_model_1 = require('./user.model');
exports.CitationSchema = new mongoose.Schema({
    text: { type: String, required: true, minlength: 10, maxlength: 300 },
    user: user_model_1.UserInfoSchema,
    tags: [{ type: String }],
    date: { type: Date, default: Date.now() },
    meta: {
        views: { type: Number, default: 0 },
        likes: { type: Number, min: 0, default: 0 },
        dislikes: { type: Number, min: 0, default: 0 },
        rank: { type: Number, default: 0 }
    }
});
exports.CitationModel = mongoose.model('Citation', exports.CitationSchema);
