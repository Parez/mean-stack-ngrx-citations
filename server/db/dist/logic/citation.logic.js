"use strict";
/**
 * Created by baunov on 22/11/16.
 */
const citation_model_1 = require('../models/citation.model');
const feed_logic_1 = require('./feed.logic');
const tag_logic_1 = require('./tag.logic');
const _ = require('lodash');
const rating_logic_1 = require('./rating.logic');
class Citation extends citation_model_1.CitationModel {
    constructor(document) {
        super(document);
        this._document = document;
    }
    /*
    static getRandomCitationForUser(username:string):Promise<ICitation>
    {
  
      //let rndSkip:number = Math.random();
      return CitationModel.aggregate([
        {$match:
          {rank: {$gt: 0}}
        },
        {
          $sort: {date: -1}},
        {
          $limit: 1000 //get 1000 most recent citations
        },
        {
          $sort: {rank: -1} //highest ranked are in the beginning of the list
        },
        {
          $group: {
            cumulativeRank: {$sum: '$rank'}
          }
        }
      ]).exec();
    }*/
    static addCitation(citation, user) {
        citation.user = (_.pick(user, ['username', '_id', 'name', 'email']));
        console.log(citation.user);
        if (citation.author === '') {
            citation.author = user.username;
        }
        //write citation to the database Citations collection
        //we only wait until the citation itself is created before returning
        tag_logic_1.Tag.addTags(citation.tags);
        return this.create(citation).then((cit) => {
            //publish citation into all followers' feeds
            feed_logic_1.Feed.publishCitation(cit._id, user.followers.map((follower) => follower._id));
        }).catch((err) => {
            console.log("Error while adding citation: " + err);
        });
    }
    static getById(id) {
        return Citation.findById(id).exec();
    }
    static getByTag(tag) {
        return this.find({ tags: tag }).exec();
    }
    static getByUser(userId, startAt = 0, num = -1) {
        return this.find({ 'user._id': userId }).exec();
    }
    static getLatestList(count = 10) {
        return Citation.aggregate([
            {
                $sort: { date: -1 }
            },
            {
                limit: count
            }]).exec();
    }
    static modifyRank(citationId, userId, delta) {
        let likes = (delta > 0) ? delta : 0;
        let dislikes = (delta < 0) ? Math.abs(delta) : 0;
        if (rating_logic_1.Rating.isRatedBy(citationId, userId)) {
            return Promise.reject('Already rated');
        }
        rating_logic_1.Rating.rateCitation(citationId, userId, delta);
        return Citation.findByIdAndUpdate(citationId, { $inc: { 'meta.likes': likes, 'meta.dislikes': dislikes, 'meta.rank': delta } }, { new: true }).exec().then((citation) => {
            if (!citation) {
                return Promise.reject('No such citation');
            }
            return Promise.resolve(citation.meta.rank);
        }).catch((err) => {
            return Promise.reject(err);
        });
    }
}
exports.Citation = Citation;
//# sourceMappingURL=citation.logic.js.map