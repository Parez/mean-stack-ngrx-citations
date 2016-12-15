"use strict";
/**
 * Created by baunov on 28/11/16.
 */
const mongoose = require('mongoose');
exports.FeedSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    month: { type: Number, required: true },
    citations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Citation' }]
});
exports.FeedSchema.index({ user: 1, month: -1 });
//index to be enable fast searching by user
//and secondary month sorting (descending)
exports.FeedModel = mongoose.model('Feed', exports.FeedSchema);
//# sourceMappingURL=feed.model.js.map