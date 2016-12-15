/**
 * Created by baunov on 28/11/16.
 */

//Monthly separated news feed for the user.
//Cache layer in order to efficiently obtain news feed for every user depending on his subscriptions

import {FeedModel, IFeed} from '../models/feed.model';
import {ICitation} from '../models/citation.model';

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

  static publishCitation(citationId:string, userIds:Array<string>):Promise<IFeed[]>
  {
    //put (link) new citation into every followers' feed
    let date:Date = new Date();
    let months:Number = date.getFullYear()*12 + date.getMonth();
    return this.update(
      { user: { $in: userIds }, month: months },
      {$push: {'citations': citationId}},
      {multi: true, upsert: true, new : true}
    ).exec();
  }

  constructor(document: IFeed) {
    super();
    this._document = document;
  }
}
