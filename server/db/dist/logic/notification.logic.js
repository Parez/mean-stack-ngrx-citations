"use strict";
/**
 * Created by baunov on 21/11/16.
 */
const notification_model_1 = require('../models/notification.model');
class Notification extends notification_model_1.NotificationModel {
    constructor(document) {
        super();
        this._document = document;
    }
    //returns a (promise) array of all non-viewed notifications regarding specified user
    static getNewNotifications(userId) {
        return Notification.find({ user: userId, viewed: false })
            .limit(10)
            .sort({ date: -1 })
            .exec()
            .then((notes) => {
            return notes;
        });
    }
    static getAggregatedNotifications(userId) {
        return Notification.aggregate([
            { $match: {
                    user: userId
                } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'srcUser',
                    foreignField: '_id',
                    as: 'srcUser'
                }
            },
            {
                $project: {
                    'srcUser.username': 1,
                    'srcUser.name': 1
                }
            },
            {
                $group: {
                    _id: { citation: '$citation', type: '$type' },
                    numPeople: { $sum: 1 },
                    people: { $push: '$srcUser' },
                    type: '$type',
                }
            },
        ]).exec().limit(10).sort({ date: -1 });
    }
    static addNotification(userId, srcUserId, citationId, type) {
        return Notification.create({
            user: userId,
            srcUser: srcUserId,
            citation: citationId,
            type
        });
    }
    get type() {
        return this._document.type;
    }
    get srcUser() {
        return this._document.srcUser;
    }
    get user() {
        return this._document.user;
    }
    get viewed() {
        return this._document.viewed;
    }
    get date() {
        return this._document.date;
    }
}
exports.Notification = Notification;
//# sourceMappingURL=notification.logic.js.map