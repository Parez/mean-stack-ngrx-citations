/**
 * Created by baunov on 12/12/16.
 */
import {Action} from "@ngrx/store";
import {Citation} from '../../models/citation';

export const Types = {
  //Citation list actions
  LOAD_BY_USER: "[CITATION_LIST] LOAD_BY_USER",
  LOAD_BY_USER_SUCCESS: "[CITATION_LIST] LOAD_BY_USER_SUCCESS",
  LOAD_BY_USER_FAILURE: "[CITATION_LIST] LOAD_BY_USER_FAILURE",

  LOAD_FEED: "[CITATION_LIST] LOAD_FEED",
  LOAD_FEED_SUCCESS: "[CITATION_LIST] LOAD_FEED_SUCCESS",
  LOAD_FEED_FAILURE: "[CITATION_LIST] LOAD_FEED_FAILURE"
};


//by user id
export class LoadByUserAction implements Action {
  type = Types.LOAD_BY_USER;
  constructor (public payload: string){}
}
export class LoadByUserSuccessAction implements Action {
  type = Types.LOAD_BY_USER_SUCCESS;
  constructor (public payload: Citation[]){} //loaded citations
}
export class LoadByUserFailureAction implements Action {
  type = Types.LOAD_BY_USER_FAILURE;
  constructor (public payload:Error){}
}

//reducer will fetch local user automatically
export class LoadFeedAction implements Action {
  type = Types.LOAD_FEED;
  constructor (public payload = null){}
}
export class LoadFeedSuccessAction implements Action {
  type = Types.LOAD_FEED_SUCCESS;
  constructor (public payload: Citation[]){}
}
export class LoadFeedFailureAction implements Action {
  type = Types.LOAD_FEED_FAILURE;
  constructor (public payload: Error){}
}


export type Actions
  = LoadByUserAction
  | LoadByUserSuccessAction
  | LoadByUserFailureAction
  | LoadFeedAction
  | LoadFeedSuccessAction
  | LoadFeedFailureAction;
