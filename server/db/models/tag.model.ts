/**
 * Created by baunov on 29/11/16.
 */
import * as mongoose from 'mongoose';

export interface ITag extends mongoose.Document
{
  text: string;
  num: number;
}

export const TagSchema:mongoose.Schema = new mongoose.Schema({
  text: {type:String, index: true, required: true, unique: true},
  num: {type:Number, default: 0}
});

export const TagModel = mongoose.model<ITag>('Tag', TagSchema);
