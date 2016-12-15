/**
 * Created by baunov on 21/11/16.
 */
import {INotification, NotificationModel, NotificationType} from '../models/notification.model';




export class Notification extends NotificationModel{

  private _document: INotification;

  //returns a (promise) array of all non-viewed notifications regarding specified user
  static getNewNotifications(userId: string): Promise <INotification[]> {
    return Notification.find({user: userId, viewed: false})
      .limit(10)
      .sort({ date: -1 })
      .exec()
      .then( (notes: Array<INotification>) => {
        return notes;
      });
  }

  static getAggregatedNotifications(userId:string): Promise <INotification[]> {
    return Notification.aggregate([
      { $match: {
        user: userId
      }},
      {
        $lookup:
        {
          from: 'users',
          localField: 'srcUser',
          foreignField: '_id',
          as: 'srcUser'
        }
      },// fetch srcUsers from users collection
      {
        $project: {
          'srcUser.username':1,
          'srcUser.name':1
        }
      },
      {
        $group: {
          _id: { citation:'$citation', type:'$type'},
          numPeople: { $sum: 1  },
          people: {$push: '$srcUser'},
          type: '$type',
        }
      },//combine similar notifications (n users disliked your "citation")
    ]).exec().limit(10).sort({ date: -1 });
  }

  static addNotification(userId: string, srcUserId: string, citationId: string, type: NotificationType): Promise <INotification> {
    return Notification.create({
      user: userId,
      srcUser: srcUserId,
      citation: citationId,
      type
    });
  }

  constructor(document: INotification) {
    super();
    this._document = document;
  }

  get type(): string {
    return this._document.type;
  }

  get srcUser(): string {
    return this._document.srcUser;
  }

  get user(): string {
    return this._document.user;
  }

  get viewed(): boolean {
    return this._document.viewed;
  }

  get date(): Date {
    return this._document.date;
  }

}

