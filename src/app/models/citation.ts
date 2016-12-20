import {User} from "./user";
/**
 * Created by baunov on 14/10/16.
 */
export class Citation
{
  //public static curId = 0;
  public _id:String = "";
  public index:number = 0;

  constructor(public text:String = "",
              public author:String = "Unknown",
              public user:User = new User("Anonymous"),
              public tags:Array<String> = [],
              public date_published:number = Date.now(),
              public rank = 0,
              public views = 0,
              public likes = 0,
              public dislikes = 0)
  {
    //this._id = String(Citation.curId);
    //Citation.curId++;
  }
}
