/**
 * Created by baunov on 25/10/16.
 */
import {UserModel, IUser, UserSchema} from '../models/user.model';
const jwt = require('jsonwebtoken');
import * as bcrypt from 'bcryptjs';
import * as validator from 'validator';
import * as _ from 'lodash';

const SECRET_KEY = '1A39Zhr6JN4J3i2xvnRbkGYuwCAl1H9Qfh6HEa8CiKRKR32mSSiQhQqn8ZNrsgQ';

export class User extends UserModel{

  private _document: IUser;

  static createUserObj(username = '', password = '', email = '', name = '', followers:Array<IUser> = []):IUser
  {
    return <IUser>{
      username,
      password,
      email,
      name,
      followers
    };
  }

  //registers a new user. also hashes his password. returns newly-created user
  static registerUser(user:IUser): Promise <IUser> {
    return new Promise((resolve, reject) => {
      (new User(user)).save().then( (newUser:IUser) => {
        console.log("saved");
        resolve(newUser);
      }).catch( (saveErr:Error) => {
        console.log("can't save");
        reject(new Error('Could not save a user ' + saveErr.message));
      });
    });
  }

  static comparePassword(candidatePassword, hash): Promise<Boolean>
  {
    return new Promise((resolve, reject) => {
      bcrypt.compare(candidatePassword, hash, (err:Error, isMatch:boolean) => {
        console.log(candidatePassword + " " + hash);
        if(err)
        {
          reject(err);
        }
        resolve(isMatch);
      });
    });
  };

  static generateAuthToken(user:IUser):Promise<string>
  {
    let access = 'auth';
    return jwt.sign({_id: user._id.toHexString(), access}, SECRET_KEY).toString();
  };

  static findByToken(token):Promise<IUser>
  {
    let decoded;

    try {
      decoded = jwt.verify(token, SECRET_KEY);
    }
    catch(error) {
      return Promise.reject(error);
    }

    return this.findOne({_id: decoded._id}).exec();
  };

  //login either by email or username (when can be both)
  static loginByCredential(cred:string, password:string):Promise<IUser>
  {
    console.log(cred + " : " + password);
    if(validator.isEmail(cred))
    {
      console.log("email");
      return User.loginByEmail(cred, password);
    }
    else
    {
      console.log("username");
      return User.loginByUsername(cred, password);
    }
  }

  static loginByEmail(email:string, password:string):Promise<IUser>
  {
    let tempUser:IUser = null;
    return User.findOne({email}).exec().then( (user:IUser) => {
      tempUser = user;
      return User.comparePassword(password, user.password);
    }).then( (isMatch:Boolean) => {
      if(isMatch)
      {
        return tempUser;
      }
    });
  }

  static loginByUsername(username:string, password:string):Promise<IUser>
  {
    let tempUser:IUser = null;
    console.log("Username login");
    return User.findOne({username}).exec().then( (user:IUser) => {

      tempUser = user;
      return User.comparePassword(password, user.password);
    }).then( (isMatch:Boolean) => {
      if(isMatch)
      {
        return tempUser;
      }
    });
  }

  public getInfo():Object
  {
    return _.pick(this._document, ['_id', 'username', 'email', 'name', 'followers']);
  }

  public getFollowers():Promise<IUser[]>
  {
    return User.find({_id: {$in: this._document.followers}}).exec();
  }

  /*
  static addNotification(userId: string, srcUserId: string, citationId: string, type: NotificationType): Promise <INotification> {
    return this.create({
      user: userId,
      srcUser: srcUserId,
      citation: citationId,
      type
    });
  }
  */



  constructor(document: IUser) {
    super(document);
    this._document = document;
  }

  //generate new auth token for the current user once he registers or logs in
}

//Is called every time before saving a user. Hashes password if it's modified
UserSchema.pre('save', function (next)
{
    let user = this;

    if (user.isModified('password')) {
      bcrypt.hash(user.password, 10, (err:Error, hash:string) => {
        if(err)
        {
          throw err;
        }
        user.password = hash;
        next();
      });
    }
    else {
      next();
    }
});

