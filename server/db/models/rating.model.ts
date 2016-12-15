/**
 * Created by baunov on 29/11/16.
 */
import * as mongoose from 'mongoose';

export type RateType = -1 | 1;

export interface IRating extends mongoose.Document {
  rank: RateType;
  user: string;
  citation: string;
}

export const RatingSchema:mongoose.Schema = new mongoose.Schema({
  rank: {type: Number, required: true}, //1 - like, -1 - dislike
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  citation: {type: mongoose.Schema.Types.ObjectId, ref: 'Citation', required: true}
});

RatingSchema.index({ user: 1, citation: 1 }, { unique: true });
//indexed by pair user-citation
//only one item with the same user-citation can exist
//hence, user is not allowed to rate something more than once (e.g. put 2 likes)

export const RatingModel = mongoose.model < IRating > ('Rating', RatingSchema);
