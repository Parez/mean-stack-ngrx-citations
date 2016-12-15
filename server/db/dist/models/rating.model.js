"use strict";
/**
 * Created by baunov on 29/11/16.
 */
const mongoose = require('mongoose');
exports.RatingSchema = new mongoose.Schema({
    rank: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    citation: { type: mongoose.Schema.Types.ObjectId, ref: 'Citation', required: true }
});
exports.RatingSchema.index({ user: 1, citation: 1 }, { unique: true });
//indexed by pair user-citation
//only one item with the same user-citation can exist
//hence, user is not allowed to rate something more than once (e.g. put 2 likes)
exports.RatingModel = mongoose.model('Rating', exports.RatingSchema);
//# sourceMappingURL=rating.model.js.map