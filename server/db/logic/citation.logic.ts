/**
 * Created by baunov on 22/11/16.
 */
import {ICitation, CitationModel} from '../models/citation.model';
import {IUser, IUserInfo} from '../models/user.model';
import {Feed} from './feed.logic';
import {Tag} from './tag.logic';
import * as _ from 'lodash';
import {RateType} from '../models/rating.model';
import {Rating} from './rating.logic';


export class Citation extends CitationModel{


  private _document: ICitation;

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

  static addCitation(citation:ICitation, user:IUser):Promise<ICitation>
  {
    citation.user = <IUserInfo>(_.pick(user, ['username', '_id', 'name', 'email']));

    console.log(citation.user);
    if(citation.author === '')
    {
      citation.author = user.username;
    }


    //write citation to the database Citations collection
    //we only wait until the citation itself is created before returning
    Tag.addTags(citation.tags);
    return this.create(citation).then( (cit) => {
      //publish citation into all followers' feeds
      Feed.publishCitation(cit._id, user.followers);
    }).catch( (err) => {
      console.log("Error while adding citation: "+err);
    });
  }

  static getById(id:string):Promise<ICitation>
  {
    return Citation.findById(id).exec();
  }

  static getByTag(tag:string):Promise<ICitation[]>
  {
    return this.find({tags: tag}).exec();
  }

  static getByUser(userId:string, startAt = 0, num = -1):Promise<ICitation[]>
  {
    return this.find({'user._id': userId}).exec();
  }

  static deleteCitation(id:string):Promise<ICitation>
  {
    Feed.deleteCitation(id);
    return this.findByIdAndRemove(id).exec();
  }

  static getLatestList(count = 10):Promise<ICitation[]>
  {
    return Citation.aggregate([
      {
        $sort: {date: -1}
      },
      {
        limit: count
      }]).exec();
  }


  static modifyRank(citationId:string, userId:string, delta:RateType):Promise<number>
  {
    let likes = (delta > 0) ? delta : 0;
    let dislikes = (delta < 0) ? Math.abs(delta) : 0;

    if(Rating.isRatedBy(citationId, userId))
    {
      return Promise.reject('Already rated');
    }

    Rating.rateCitation(citationId, userId, delta);
    return Citation.findByIdAndUpdate(citationId,
      {$inc: {'meta.likes':likes, 'meta.dislikes':dislikes, 'meta.rank': delta}},
      {new: true}).exec().then( (citation:ICitation) => {
        if(!citation)
        {
          return Promise.reject('No such citation');
        }
        return Promise.resolve(citation.meta.rank);
    }).catch( (err) => {
      return Promise.reject(err);
    });
  }

  constructor(document: ICitation) {
    super(document);
    this._document = document;
  }
}

