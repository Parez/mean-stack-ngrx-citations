/**
 * Created by baunov on 14/10/16.
 */
import {User} from "../models/user";

export class TestUsersDB
{
  private userArray:Array<User> = [];

  constructor()
  {
    this.userArray.push(new User("Sugrow", "parugvai", "parezguru@gmail.com","Daniil Baunov"));
    this.userArray.push(new User("Pikin", "par1234", "pikin@gmail.com","Sanya Pikin"));
    this.userArray.push(new User("Polina", "asiuy", "polyna@gmail.com","Polyna Mlafeeva"));
    this.userArray.push(new User("Veteran", "pjhgf", "vitor@gmail.com","Viktor Semisinov"));
    this.userArray.push(new User("DashaGul", "lulhfljhf", "vitor@gmail.com","Viktor Semisinov"));
  }

  public getById(id:String):User
  {
    for(let i=0; i < this.userArray.length; i++)
    {
      if(this.userArray[i]._id == id)
      {
        return this.userArray[i];
      }
    }
    return new User("No such user");
  }

  public addUser(user:User):Number
  {
    this.userArray.push(user);
    return User.curId;
  }

  public signIn(email:String, password:String):String
  {
    this.userArray.forEach((user) => {
      if(user.email == email && user.password == password)
      {
        return user;
      }
    });
    return null;
  }

}
