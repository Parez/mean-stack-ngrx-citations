"use strict";
/**
 * Created by baunov on 28/11/16.
 */
var mongoose = require('mongoose');
var citation_model_1 = require('./citation.model');
exports.FeedSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    month: { type: Number, required: true },
    citations: [citation_model_1.CitationSchema]
});
exports.FeedSchema.index({ user: 1, month: -1 });
//index to be enable fast searching by user
//and secondary month sorting (descending)
exports.FeedModel = mongoose.model('Feed', exports.FeedSchema);
