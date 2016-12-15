"use strict";
/**
 * Created by baunov on 29/11/16.
 */
const mongoose = require('mongoose');
exports.TagSchema = new mongoose.Schema({
    text: { type: String, index: true, required: true, unique: true },
    num: { type: Number, default: 0 }
});
exports.TagModel = mongoose.model('Tag', exports.TagSchema);
//# sourceMappingURL=tag.model.js.map