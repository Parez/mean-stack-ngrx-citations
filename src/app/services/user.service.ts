import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {TestUsersDB} from "../user/TestUsersDB";
import {Observable} from 'rxjs/Rx';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {LoginCredentials} from '../models/loginCredentials';
import {RegisterCredentials} from '../models/registerCredentials';
import * as _ from 'lodash';

@Injectable()
export class UserService {
  public static db:TestUsersDB;
  private usersUrl:string = "users/";

  private headers:Headers = new Headers({ 'Content-Type': 'application/json' });
  private options:RequestOptions = new RequestOptions({ headers: this.headers });

  constructor(private http:Http) {
    UserService.db = new TestUsersDB();
    if(localStorage.getItem('currentUser') != null)
    {
      console.log("User logged in");
      User.token = JSON.parse(localStorage.getItem('currentUser')).token;
      this.headers.append('x-auth', User.token);
      this.getProfileInfo().subscribe( (user:User) => {
        User.localUser = _.pick(user, ["name", "username", "email", "followers", "rank", "_id"]) as User;
      }, (error) => {
        this.handleError(error);
      });
    }
  }

  addUser(user:User):Observable<User>
  {
    let userId = UserService.db.addUser(user);
    return new Observable<User>(observer => observer.next(userId));
  }

  //register user. Return true if registration was successful.
  //once registered - user is automatically logged in (e.g. auth-token is saved)
  //user object should contain registration info
  signUp(registerCred:RegisterCredentials):Observable<User>
  {
    return this.http.post(this.usersUrl+'signup', registerCred, this.options).map((response: Response) => {
      // registration successful if there's a jwt token in the response header
      if(response.headers.has('x-auth'))
      {
        //store token and user in the service for further easy access

        User.localUser = _.pick(response.json(), ["name", "username", "email", "followers", "rank", "_id"]) as User;
        User.token = response.headers.get('x-auth');
        localStorage.setItem('currentUser', JSON.stringify({ username: response.json().username, token: User.token }));
        this.headers.set('x-auth', User.token);
        return _.pick(response.json(), ["name", "username", "email", "followers", "rank", "_id"]) as User;
      }
      return null;
    });
  }

  signIn(loginCred:LoginCredentials):Observable<User>
  {
    //log in using login credentials (cred and pass); returns true if login was successful
    return this.http.post(this.usersUrl+'signin', loginCred, this.options).map((response: Response) => {
      // login successful if there's a jwt token in the response header
      if(response.headers.has('x-auth'))
      {
        //store token and user in the service for further easy access

        User.localUser = _.pick(response.json(), ["name", "username", "email", "followers", "rank", "_id"]) as User;
        User.token = response.headers.get('x-auth');
        localStorage.setItem('currentUser', JSON.stringify({ username: response.json().username, token: User.token }));
        this.headers.set('x-auth', User.token);
        return _.pick(response.json(), ["name", "username", "email", "followers", "rank", "_id"]) as User;
      }
      return null;
    });
  }

  signOut(): void {
    // clear token remove user from local storage to log user out
    User.token = null;
    User.localUser = null;
    localStorage.removeItem('currentUser');
  }


  getProfileInfo():Observable<User>
  {
    this.options.headers.set('x-auth', User.token);
    return this.http.get(this.usersUrl+'me', this.options).map((response: Response) => {
      return response.json() as User;
    }, (err) => {
      this.handleError(err);
    });
  }

  getUserById(id:String):Observable<User>
  {
    return this.http.get(this.usersUrl+id).map((response: Response) => {
      return response.json() as User;
    });
    //return new Observable<User>(observer => observer.next(UserService.db.getById(id)));
    /**/
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error("UsersService" + errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
