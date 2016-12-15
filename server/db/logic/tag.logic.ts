/**
 * Created by baunov on 25/10/16.
 */
import {TagModel, ITag} from '../models/tag.model';
import * as _ from 'lodash';

export class Tag extends TagModel{

  private _document: ITag;

  //for search-box fast suggestions
  static searchTag(searchText:string, limit = 10):Promise<ITag>
  {
    let re:RegExp = new RegExp('^'+searchText);
    return this.find({text: { $regex : re }}).limit(limit).exec();
  }

  static addTags(tags:Array<string>):void
  {
    console.log(tags);
    let lowerTags:Array<string> = tags.map(tag => {
      return String(tag).toLowerCase();
    });
    //console.log(JSON.stringify(lowerTags));

    let tagObjs:Array<ITag> = lowerTags.map(tag => new TagModel({text:tag, num:1} as ITag));

    console.log("tagObjs "+tagObjs.length);
    console.log("lowerTags "+lowerTags.length);

    TagModel.find({text: {$in: lowerTags}}).exec().then( (foundTags:ITag[]) => {

      this.update({text: { $in: lowerTags }}, {$inc: {num: 1}}, {multi: true}).exec().catch( err => {
        console.log(err);
      });

      _.pullAllBy(tagObjs, foundTags, "text");

      if(tagObjs.length <= 0)
      {
        return;
      }

      this.insertMany(tagObjs);
    }).catch( err => {
      console.log(err);
    });


    /**/
    /*this.collection.insertMany(lowerTags).catch(err => {
      console.log(err);
    });*/
  }

  public get text():string
  {
    return this._document.text;
  }

  public get num():number
  {
    return this._document.num;
  }

  constructor(document: ITag) {
    super(document);
    this._document = document;
    console.log("Document:" + document);
  }
}
