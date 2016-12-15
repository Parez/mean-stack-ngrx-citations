/**
 * Created by baunov on 04/11/16.
 */
import {IRating, RatingModel, RateType} from '../models/rating.model';
//const Citation = require("./citation");
//const User = require("./user");

export class Rating extends RatingModel{

  private _document: IRating;


  //rates the citation (creates new rating or updates the existing one)
  static rateCitation(userId: string, citationId: string, rank: RateType):Promise<IRating>
  {
    return Rating.findOneAndUpdate(
      {user: userId, citation: citationId},
      { $set: {rank}},
      {upsert: true, new: true})
      .exec().then( (rating) => {
        //Notification.addNotification(citation.authorId, userId, citationId, (rank < 0?'Dislike':'Like'));
        return rating;
      });
  }

  //check if user already rated the citation
  static isRatedBy(citationId: string, userId: string):Promise<Boolean>
  {
    return Rating.findOne({user: userId, citation: citationId})
      .exec()
      .then( (rating) => {
        return (!!rating);
      });
  }

  static getCitationRatings(citationId: string):Promise<IRating[]>
  {
    return Rating.find({citation: citationId}).exec();
  }

  static countCitationRating(citationId: string):Promise<number>
  {
    return Rating.find({citation: citationId}, 'rank').then( (docs) => {
    //sum up all rankings to get the total
      return docs.map( (doc) => Number(doc.rank)).reduce((prev, curr) => prev + curr);
    });
  }

  static countCitationLikes(citationId: string):Promise<number>
  {
    return Rating.count({citation: citationId, rank: 1}).exec();
  };

  static countCitationDislikes(citationId: string)
  {
    return Rating.count({citation: citationId, rank: -1});
  };

  constructor(document: IRating) {
    super();
    this._document = document;
  }
}
