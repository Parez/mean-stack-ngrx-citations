/**
 * Created by baunov on 28/11/16.
 */
import * as mongoose from 'mongoose';
import {IUserInfo} from './user.model';

export interface ICitation extends mongoose.Document
{
  text: string;
  user: IUserInfo;
  author: string;
  tags: Array<string>;
  date: Date; //date generated
  meta: {
    views: number;
    likes: number;
    dislikes: number;
    rank: number;
  };
}

export const CitationSchema:mongoose.Schema = new mongoose.Schema({
  text: {type: String, required: true, minlength: 10, maxlength: 300},
  user: {
    username: {type:String, required: true},
    name: {type:String},
    email: {type:String},
    _id: {type: String, required: true}
  },
  author: {type: String},
  tags: [{type:String}],
  date: {type: Date, default: Date.now()},
  meta: {
    views: {type: Number, default: 0},
    likes: { type: Number, min: 0, default: 0},
    dislikes: { type: Number, min: 0, default: 0},
    rank: {type: Number, default: 0}
  }
});

export const CitationModel = mongoose.model <ICitation> ('Citation', CitationSchema);
