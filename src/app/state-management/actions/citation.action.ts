/**
 * Created by baunov on 12/12/16.
 */
import {Action} from "@ngrx/store";
import {Citation} from '../../models/citation';

export const Types = {
  LOAD: "[CITATION] LOAD",
  LOAD_SUCCESS: "[CITATION] LOAD_SUCCESS",
  LOAD_FAILURE: "[CITATION] LOAD_FAILURE",

  LIKE: "[CITATION] LIKE",
  LIKE_SUCCESS: "[CITATION] LIKE_SUCCESS",
  LIKE_FAILURE: "[CITATION] LIKE_FAILURE",

  DISLIKE: "[CITATION] DISLIKE",
  DISLIKE_SUCCESS: "[CITATION] DISLIKE_SUCCESS",
  DISLIKE_FAILURE: "[CITATION] DISLIKE_FAILURE",

  CREATE: "[CITATION] CREATE",
  CREATE_SUCCESS: "[CITATION] CREATE_SUCCESS",
  CREATE_FAILURE: "[CITATION] CREATE_FAILURE",

  DELETE: "[CITATION] DELETE",
  DELETE_SUCCESS: "[CITATION] DELETE_SUCCESS",
  DELETE_FAILURE: "[CITATION] DELETE_FAILURE",

  EDIT: "[CITATION] EDIT",
  EDIT_SUCCESS: "[CITATION] EDIT_SUCCESS",
  EDIT_FAILURE: "[CITATION] EDIT_FAILURE",
};


//Load citation actions (by id)
export class LoadAction implements Action {
  type = Types.LOAD;
  constructor (public payload:string){} //load by id
}
export class LoadSuccessAction implements Action {
  type = Types.LOAD_SUCCESS;
  constructor (public payload:Citation){} //Citation to continue with
}
export class LoadFailureAction implements Action {
  type = Types.LOAD_FAILURE;
  constructor (public payload:Error){}
}

//Like citation actions (by id)
export class LikeAction implements Action {
  type = Types.LIKE;
  constructor (public payload:string){} //citation id
}
export class LikeSuccessAction implements Action {
  type = Types.LIKE_SUCCESS;
  constructor (public payload:Citation){} // should increment rank by 1 upon success
}
export class LikeFailureAction implements Action {
  type = Types.LIKE_FAILURE;
  constructor (public payload:Error){}
}

//Dislike citation actions (by id)
export class DislikeAction implements Action {
  type = Types.DISLIKE;
  constructor (public payload:string){} //citation id
}
export class DislikeSuccessAction implements Action {
  type = Types.DISLIKE_SUCCESS;
  constructor (public payload:Citation){} // should decrement rank by 1 upon success
}
export class DislikeFailureAction implements Action {
  type = Types.DISLIKE_FAILURE;
  constructor (public payload:Error){}
}

//Create citation actions (by Citation object)
export class CreateAction implements Action {
  type = Types.CREATE;
  constructor (public payload:Citation){} //citation data to write to db
}
export class CreateSuccessAction implements Action {
  type = Types.CREATE_SUCCESS;
  constructor (public payload:Citation){} // should return citation from db
}
export class CreateFailureAction implements Action {
  type = Types.CREATE_FAILURE;
  constructor (public payload:Error){}
}

//Delete citation actions (by id)
export class DeleteAction implements Action {
  type = Types.DELETE;
  constructor (public payload:string){} //id is enough
}
export class DeleteSuccessAction implements Action {
  type = Types.DELETE_SUCCESS;
  constructor (public payload:Citation){} // pass deleted citation entity
}
export class DeleteFailureAction implements Action {
  type = Types.DELETE_FAILURE;
  constructor (public payload:Error){}
}

//Edit citation actions (by Citation object)
export class EditAction implements Action {
  type = Types.EDIT;
  constructor (public payload:Citation){} //edit by Citation data
}
export class EditSuccessAction implements Action {
  type = Types.EDIT_SUCCESS;
  constructor (public payload:Citation){} //Citation to continue with
}
export class EditFailureAction implements Action {
  type = Types.EDIT_FAILURE;
  constructor (public payload:Error){}
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailureAction
  | LikeAction
  | LikeSuccessAction
  | LikeFailureAction
  | DislikeAction
  | DislikeSuccessAction
  | DislikeFailureAction
  | CreateAction
  | CreateSuccessAction
  | CreateFailureAction
  | DeleteAction
  | DeleteSuccessAction
  | DeleteFailureAction
  | EditAction
  | EditSuccessAction
  | EditFailureAction;
