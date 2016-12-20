import {Observable} from 'rxjs';
/**
 * Created by baunov on 12/12/16.
 */

export function handleError (serviceName:string, error: any) {
  // In a real world app, we might use a remote logging infrastructure
  // We'd also dig deeper into the error to get a better message
  let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  console.error("CitationService" + errMsg); // log to console instead
  return Observable.throw(errMsg);
}
