"use strict";
/**
 * Created by baunov on 06/12/16.
 */
const mongoose = require('mongoose');
exports.NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    srcUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    citation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Citation',
        require: true
    },
    viewed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
exports.NotificationSchema.index({ user: 1 });
exports.NotificationModel = mongoose.model('Notification', exports.NotificationSchema);
//# sourceMappingURL=notification.model.js.map