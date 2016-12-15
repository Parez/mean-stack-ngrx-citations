"use strict";
/**
 * Created by baunov on 04/11/16.
 */
const rating_model_1 = require('../models/rating.model');
//const Citation = require("./citation");
//const User = require("./user");
class Rating extends rating_model_1.RatingModel {
    constructor(document) {
        super();
        this._document = document;
    }
    //rates the citation (creates new rating or updates the existing one)
    static rateCitation(userId, citationId, rank) {
        return Rating.findOneAndUpdate({ user: userId, citation: citationId }, { $set: { rank } }, { upsert: true, new: true })
            .exec().then((rating) => {
            //Notification.addNotification(citation.authorId, userId, citationId, (rank < 0?'Dislike':'Like'));
            return rating;
        });
    }
    //check if user already rated the citation
    static isRatedBy(citationId, userId) {
        return Rating.findOne({ user: userId, citation: citationId })
            .exec()
            .then((rating) => {
            return (!!rating);
        });
    }
    static getCitationRatings(citationId) {
        return Rating.find({ citation: citationId }).exec();
    }
    static countCitationRating(citationId) {
        return Rating.find({ citation: citationId }, 'rank').then((docs) => {
            //sum up all rankings to get the total
            return docs.map((doc) => Number(doc.rank)).reduce((prev, curr) => prev + curr);
        });
    }
    static countCitationLikes(citationId) {
        return Rating.count({ citation: citationId, rank: 1 }).exec();
    }
    ;
    static countCitationDislikes(citationId) {
        return Rating.count({ citation: citationId, rank: -1 });
    }
    ;
}
exports.Rating = Rating;
//# sourceMappingURL=rating.logic.js.map