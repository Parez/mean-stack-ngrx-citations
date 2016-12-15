/**
 * Created by baunov on 28/11/16.
 */
import * as mongoose from 'mongoose';

export interface IFeed extends mongoose.Document
{
  user: String; //we only need user id for searching
  month: number;
  citations: Array<String>;
}

export const FeedSchema:mongoose.Schema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  month: {type: Number, required: true},
  citations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Citation'}]
});

FeedSchema.index({user: 1, month: -1});
//index to be enable fast searching by user
//and secondary month sorting (descending)

export const FeedModel = mongoose.model<IFeed> ('Feed', FeedSchema);
