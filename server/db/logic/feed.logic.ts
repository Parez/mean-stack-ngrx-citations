/**
 * Created by baunov on 28/11/16.
 */

//Monthly separated news feed for the user.
//Cache layer in order to efficiently obtain news feed for every user depending on his subscriptions

import {FeedModel, IFeed} from '../models/feed.model';
import {ICitation} from '../models/citation.model';
import {Citation} from './citation.logic';

export class Feed extends FeedModel{

  private _document: IFeed;

  static getUserFeed(userId:string, month:number):Promise<ICitation[]>
  {
    return this.aggregate([
      {$match:
        {user: userId},
        month: {$lte: month}
      },
      {
        $sort: {month: -1}
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
        $sort: {date: -1} //might be overkill. They are probably already sorted
      }]
    ).exec();
  }

  //publish all citations by user(userId) into subscriber's feed
  static initSubscription(subscriberId: string, userId: string):Promise<IFeed>
  {
    let date:Date = new Date();
    let months:Number = date.getFullYear()*12 + date.getMonth();
    return Citation.getByUser(userId).then( (citations:ICitation[]) => {
      let citIds:string[] = citations.map(cit => cit._id);
      return this.update(
        {user: subscriberId, month: months},
        {$push: {citations: citIds}},
        {upsert: true, new : true}
      )
    });
  }

  static removeSubscription(subscriberId: string, userId: string):Promise<IFeed>
  {
    return Citation.getByUser(userId).then( (citations:ICitation[]) => {
      let citIds:string[] = citations.map(cit => cit._id);
      return this.update(
        {user: subscriberId},
        {$pull: {citations: citIds}},
        {new : true, multi: true}
      )
    });
  }

  static publishCitation(citationId:string, subscriberIds:Array<string>):Promise<IFeed[]>
  {
    //put (link) new citation into every followers' feed
    let date:Date = new Date();
    let months:Number = date.getFullYear()*12 + date.getMonth();
    return this.update(
      { user: { $in: subscriberIds }, month: months },
      {$push: {citations: citationId}},
      {multi: true, upsert: true, new : true}
    ).exec();
  }

  static deleteCitation(citationId:string):Promise<IFeed[]>
  {
    return this.update(
      { citations: citationId },
      { $pull: { citations: citationId } },
      {multi: true, new : true}
    ).exec();
  }

  constructor(document: IFeed) {
    super();
    this._document = document;
  }
}
