import { Injectable } from '@angular/core';
import {Citation} from "../models/citation";
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {TestCitationsDB} from "../citation/TestCitationsDB";
import {User} from "../models/user";
import * as _ from 'lodash';

@Injectable()
export class CitationService {

  public static db:TestCitationsDB;
  private citationsUrl:string = "citations/";
  private headers:Headers = new Headers({ 'Content-Type': 'application/json' });
  private options:RequestOptions = new RequestOptions({ headers: this.headers });

  constructor(private http:Http) {
    CitationService.db = new TestCitationsDB();
  }

  getCitationById(id:string):Observable<Citation>
  {
    this.options.headers.set('x-auth', User.token);

    return this.http.patch(this.citationsUrl+id, {}, this.options).map((response: Response) => {
      return response.json() as Citation;
    },(err) => {
      this.handleError(err);
    });
  }

  getCitation():Observable<Citation>
  {
    return new Observable<Citation>(observer => observer.next(CitationService.db.getRndCitation()));
  }

  viewCitation(citation:Citation):Observable<Citation>
  {
    return new Observable<Citation>(observer => observer.next(CitationService.db.viewCitation(citation._id)));
  }

  getUserFeed():Observable<Citation[]>
  {
    let headers:Headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('x-auth', User.token);
    let reqOptions:RequestOptions = new RequestOptions({ headers: this.headers });
    return this.http.get(this.citationsUrl+"feed", reqOptions).map((response: Response) => {
      return response.json() as Citation[];
    },(err) => {
      this.handleError(err);
    });
  }

  getUserCitations(userId = ""):Observable<Citation[]>
  {
    //if user is not passed, get citations by currently logged in user
    let id:string = (userId)?userId:User.localUser._id;

    let headers:Headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('x-auth', User.token);
    let reqOptions:RequestOptions = new RequestOptions({ headers: this.headers });

    return this.http.get(this.citationsUrl+"user/"+id, reqOptions).map((response: Response) => {
      let citAr:Citation[] = response.json() as Citation[];
      return citAr;
    },(err) => {
      this.handleError(err);
    });
    //return new Observable<Citation>(observer => observer.next(CitationService.db.getUserCitations(user)));
  }

  likeCitation(id:string):Observable<Citation>
  {
    this.options.headers.set('x-auth', User.token);

    return this.http.patch(this.citationsUrl+"like/"+id, {}, this.options).map((response: Response) => {
      return response.json() as Citation;
    },(err) => {
      this.handleError(err);
    });
  }

  dislikeCitation(id:string):Observable<Citation>
  {
    this.options.headers.set('x-auth', User.token);

    return this.http.patch(this.citationsUrl+"dislike/"+id, {}, this.options).map((response: Response) => {
      return response.json() as Citation;
    },(err) => {
      this.handleError(err);
    });
  }

  addCitation(citation:Citation):Observable<Citation>
  {
    this.options.headers.set('x-auth', User.token);

    let citationInfo:Object = _.pick(citation, ["text", "tags", "author"]);

    return this.http.post(this.citationsUrl, citationInfo, this.options).map((response: Response) => {
      return response.json() as Citation;
    },(err) => {
      this.handleError(err);
    });
    //return new Observable<Citation>(observer => observer.next(CitationService.db.addCitation(citation)));
  }

  deleteCitation(id:string):Observable<Citation>
  {
    this.options.headers.set('x-auth', User.token);
    return this.http.delete(this.citationsUrl+id, this.options).map(response => response.json() as Citation);
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error("CitationService" + errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
