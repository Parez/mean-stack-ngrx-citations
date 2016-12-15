/**
 * Created by baunov on 06/12/16.
 */
import * as mongoose from 'mongoose';

export type NotificationType = 'Like' | 'Dislike' | 'Favourite';

export interface INotification extends mongoose.Document
{
  type: string;
  srcUser: string; //User who put like/dislike or added to favourites
  user: string; //User who owns the liked/disliked/favourited post (for fast references)
  citation: string; //liked/disliked/favourited citation
  viewed: boolean; //if the notification was already seen by the tgUser
  date: Date; //date generated
}

export const NotificationSchema: mongoose.Schema = new mongoose.Schema({
  type: {
    type: String,
    require: true
  },
  srcUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  citation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Citation',
    require: true
  },
  viewed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
NotificationSchema.index({user: 1});

export const NotificationModel = mongoose.model < INotification > ('Notification', NotificationSchema);
