/**
 * Created by baunov on 14/10/16.
 */

export class User
{
  static localUser:User = new User();
  static token:string = "";
  public static curId = 0;
  public _id:string = "";

  constructor(public username = "",
              public password = "",
              public email = "",
              public name = "",
              public rank = 0
  ){
    //this._id = String(User.curId);
    //User.curId++;
  }
}
