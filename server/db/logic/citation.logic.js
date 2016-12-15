"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by baunov on 22/11/16.
 */
var citation_model_1 = require('../models/citation.model');
var feed_logic_1 = require('./feed.logic');
var Citation = (function (_super) {
    __extends(Citation, _super);
    function Citation(document) {
        _super.call(this);
        this._document = document;
    }
    Citation.getRandomCitationForUser = function (username) {
        //let rndSkip:number = Math.random();
        return citation_model_1.CitationModel.aggregate([
            { $match: { rank: { $gt: 0 } }
            },
            {
                $sort: { date: -1 } },
            {
                $limit: 1000 //get 1000 most recent citations
            },
            {
                $sort: { rank: -1 } //highest ranked are in the beginning of the list
            },
            {
                $group: {
                    cumulativeRank: { $sum: '$rank' }
                }
            }
        ]).exec();
    };
    Citation.addCitation = function (citation, user) {
        citation.user = user;
        //write citation to the database Citations collection
        //we only wait until the citation itself is created before returning
        return this.create(citation).then(function (cit) {
            //publish citation into all followers' feeds
            feed_logic_1.Feed.publishCitation(cit._id, user.followers.map(function (follower) { return follower._id; }));
        });
    };
    Citation.getByTag = function (tag) {
        return this.find({ tags: tag }).exec();
    };
    Citation.getByUser = function (username, startAt, num) {
        if (startAt === void 0) { startAt = 0; }
        if (num === void 0) { num = -1; }
        return this.find({ username: username }).exec();
    };
    Citation.modifyRank = function (id, delta) {
        var likes = (delta > 0) ? delta : 0;
        var dislikes = (delta < 0) ? Math.abs(delta) : 0;
        return this.findByIdAndUpdate(id, { $inc: { likes: likes, dislikes: dislikes, rank: delta } }, { new: true }).exec();
    };
    return Citation;
}(citation_model_1.CitationModel));
exports.Citation = Citation;
