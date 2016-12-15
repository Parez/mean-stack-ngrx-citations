import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Tag} from '../models/tag';
import {handleError} from '../utils/handleErrors';

@Injectable()
export class TagService {

  private tagsUrl:string = "tags/";
  private headers:Headers = new Headers({ 'Content-Type': 'application/json' });
  private options:RequestOptions = new RequestOptions({ headers: this.headers });

  constructor(private http:Http) {
  }

  getSuggestedTags(searchStr:string):Observable<Tag[]>
  {
    return this.http.get(this.tagsUrl+searchStr, this.options).map((response: Response) => {
      return response.json() as Tag[];
    },(err) => {
      handleError("tagService", err);
    });
  }
}
