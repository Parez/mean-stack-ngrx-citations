/**
 * Created by baunov on 28/11/16.
 */
"use strict";
//Monthly separated news feed for the user.
//Cache layer in order to efficiently obtain news feed for every user depending on his subscriptions
const feed_model_1 = require('../models/feed.model');
class Feed extends feed_model_1.FeedModel {
    constructor(document) {
        super();
        this._document = document;
    }
    static getUserFeed(userId, month) {
        return this.aggregate([
            { $match: { user: userId },
                month: { $lte: month }
            },
            {
                $sort: { month: -1 }
            },
            { $unwind: '$citations' },
            {
                //get all citations from the array (return array of citations)
                $lookup: {
                    from: 'citations',
                    localField: 'citations',
                    foreignField: '_id',
                    as: 'citationObjects'
                }
            },
            {
                $sort: { date: -1 } //might be overkill. They are probably already sorted
            }]).exec();
    }
    static publishCitation(citationId, userIds) {
        //put (link) new citation into every followers' feed
        let date = new Date();
        let months = date.getFullYear() * 12 + date.getMonth();
        return this.update({ user: { $in: userIds }, month: months }, { $push: { 'citations': citationId } }, { multi: true, upsert: true, new: true }).exec();
    }
}
exports.Feed = Feed;
//# sourceMappingURL=feed.logic.js.map