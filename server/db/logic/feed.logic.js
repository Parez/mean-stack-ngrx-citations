/**
 * Created by baunov on 28/11/16.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//Monthly separated news feed for the user.
//Cache layer in order to efficiently obtain news feed for every user depending on his subscriptions
var feed_model_1 = require('../models/feed.model');
var Feed = (function (_super) {
    __extends(Feed, _super);
    function Feed(document) {
        _super.call(this);
        this._document = document;
    }
    Feed.getUserFeed = function (userId, month) {
        return this.aggregate({ $match: { user: userId },
            month: { $lte: month }
        }, {
            $sort: { month: -1 }
        }, { $unwind: '$citations' }, {
            //get all citations from the array (return array of citations)
            $lookup: {
                from: 'citations',
                localField: 'citations',
                foreignField: '_id',
                as: 'citationObjects'
            }
        }, {
            $sort: { date: -1 } //might be overkill. They are probably already sorted
        }).exec();
    };
    Feed.publishCitation = function (citationId, userIds) {
        //put (link) new citation into every followers' feed
        var date = new Date();
        var months = date.getFullYear() * 12 + date.getMonth();
        return this.update({ user: { $in: userIds }, month: months }, { $push: { 'citations': citationId } }, { multi: true, upsert: true, new: true }).exec();
    };
    return Feed;
}(feed_model_1.FeedModel));
exports.Feed = Feed;
